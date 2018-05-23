import 'dotenv/config'
import fetch from 'isomorphic-unfetch'
import chalk from 'chalk'
import db from '../data-api/db'
import Organization from '../data-api/db/models/Organization'
import User_Organization from '../data-api/db/models/User_Organization'
import Story from '../data-api/db/models/Story'
import Image from '../data-api/db/models/Image'
import Media from '../data-api/db/models/Media'

import Obj from '../data-api/db/models/Obj'
import Content from '../data-api/db/models/Content'
import { Op } from 'sequelize'
import TurndownService from 'turndown'

const tdService = new TurndownService()

const log = msg => console.log(chalk.cyan(msg))

async function populate() {
  try {
    const Mia = await Organization.create({
      subdomain: 'mia',
      name: 'Minneapolis Institute of Art',
      customObjApiEnabled: true,
      customObjApiEndpoint:
        ' https://iexj7ikn39.execute-api.us-west-2.amazonaws.com/prod/lume-mia-micro',
      objSearchEndpoint:
        'https://f2lx6xi5a2.execute-api.us-west-2.amazonaws.com/prod/mia-obj-search/',
      customImageApiEnabled: false,
      emailDomain: 'artsmia.org',
      newUsersRequireApproval: true
    })

    const Africa = await Organization.create({
      subdomain: 'africa',
      name: 'Eyes on Africa',
      customObjApiEnabled: true,
      customObjApiEndpoint:
        ' https://iexj7ikn39.execute-api.us-west-2.amazonaws.com/prod/lume-mia-micro',
      objSearchEndpoint:
        'https://f2lx6xi5a2.execute-api.us-west-2.amazonaws.com/prod/mia-obj-search/',
      customImageApiEnabled: false,
      emailDomain: 'artsmia.org',
      newUsersRequireApproval: true
    })

    const gretchenId = 'google-oauth2|112934604856216651589'
    const carlId = 'google-oauth2|116437175748732542207'

    await User_Organization.create({
      organizationId: Mia.id,
      userId: gretchenId,
      role: 'admin'
    })

    await User_Organization.create({
      organizationId: Mia.id,
      userId: carlId,
      role: 'admin'
    })

    await User_Organization.create({
      organizationId: Africa.id,
      userId: gretchenId,
      role: 'admin'
    })

    const getImageDescTitle = async id => {
      try {
        const response = await fetch(`http://search.artsmia.org/id/${id}`)

        const json = await response.json()

        return {
          title: json ? json.title : '',
          description: json ? json.description : ''
        }
      } catch (ex) {
        console.error(ex)
      }
    }

    const create = async (url, Org) => {
      try {
        const response = await fetch(url)
        const data = await response.json()

        const { objects: originals, stories: sliders } = data

        let objStories = Object.keys(originals).map(key => {
          let story = originals[key]

          return {
            primaryImageLocalId: story.views[0].image,
            objLocalId: story.id,
            objContentTitle: story.title,
            objContentDescription: tdService.turndown(story.description),
            views: story.views,
            relatedStoriesLocalIds: story.relatedStories
          }
        })

        for (let oldStory of objStories) {
          let { title, description } = await getImageDescTitle(
            oldStory.primaryImageLocalId
          )

          let image = await Org.createImage({
            localId: oldStory.primaryImageLocalId,
            host: 'mia',
            title,
            description
          })

          let story = await Org.createStory({
            template: 'original',
            previewImageId: image.id,
            visibility: 'published',
            title: oldStory.objContentTitle,
            slug: oldStory.objContentTitle.replace(/\s/g, '-').toLowerCase(),
            localId: oldStory.objLocalId
          })

          let obj = await Org.createObj({
            localId: oldStory.objLocalId,
            pullFromCustomApi: true,
            primaryMediaType: 'image',
            primaryImageId: image.id
          })

          let contentIndex = 0

          let objContent = await story.createContent({
            type: 'obj',
            title: oldStory.objContentTitle,
            description: oldStory.objContentDescription,
            objId: obj.id,
            index: contentIndex
          })

          for (let view of oldStory.views) {
            let { title, description } = await getImageDescTitle(view.image)

            let [detailImage] = await Image.findOrCreate({
              where: {
                localId: view.image,
                host: 'mia'
              },
              defaults: {
                organizationId: Org.id,
                title,
                description
              }
            })

            for (let detail of view.annotations) {
              let geometry = {
                type: 'Polygon',
                coordinates: [
                  detail.geoJSON.geometry.coordinates[0].map(coord => [
                    coord[0] * 256,
                    coord[1] * 256
                  ])
                ]
              }

              let feature = {
                type: 'Feature',
                geometry
              }

              let geoJSON = {
                type: 'FeatureCollection',
                features: [feature]
              }

              contentIndex++

              let content = await story.createContent({
                type: 'detail',
                title: detail.title,
                description: tdService.turndown(detail.description),
                geoJSON,
                index: contentIndex,
                image0Id: detailImage.id
              })

              for (let attachment of detail.attachments) {
                let { title, description } = await getImageDescTitle(
                  attachment['image_id']
                )

                let [additionalImage] = await Image.findOrCreate({
                  where: {
                    localId: attachment['image_id'],
                    host: 'mia'
                  },
                  defaults: {
                    organizationId: Org.id
                  }
                })

                await content.addAdditionalImages(additionalImage)
              }
            }
          }
        }

        let slideStories = Object.keys(sliders).map(key => {
          let story = sliders[key]
          if (!story) {
            return {
              title: 'error',
              contents: 'error',
              localId: 'error'
            }
          }
          return {
            title: story.title,
            contents: story.pages,
            localId: story.id
          }
        })

        for (let oldStory of slideStories) {
          let story = await Org.createStory({
            template: 'slider',
            visibility: 'published',
            title: oldStory.title,
            slug: oldStory.title.replace(/\s/g, '-').toLowerCase(),
            localId: oldStory.localId
          })

          let contentIndex = 0

          let hasImage = false

          for (let content of oldStory.contents) {
            let image0
            let image1
            let type

            if (content.type === 'image') {
              type = 'picture'

              let { title, description } = await getImageDescTitle(
                content.image
              )
              let result = await Image.findOrCreate({
                where: {
                  localId: content.image,
                  host: 'mia'
                },
                defaults: {
                  organizationId: Org.id,
                  title,
                  description
                }
              })
              image0 = result[0]

              if (!hasImage) {
                await story.setPreviewImage(image0)
              }
            }

            if (content.type === 'comparison') {
              type = 'comparison'
              let { title, description } = await getImageDescTitle(
                content.image
              )
              let result = await Image.findOrCreate({
                where: {
                  localId: content.image,
                  host: 'mia'
                },
                defaults: {
                  organizationId: Org.id,
                  title,
                  description
                }
              })
              image0 = result[0]
              let imgResult = await getImageDescTitle(content.image)
              result = await Image.findOrCreate({
                where: {
                  localId: content.imageB,
                  host: 'mia'
                },
                defaults: {
                  organizationId: Org.id,
                  title: imgResult.title,
                  description: imgResult.description
                }
              })

              image1 = result[0]
            }

            if (content.type === 'video') {
              type = 'movie'
            }

            let description = content.text
              ? tdService.turndown(content.text)
              : ''

            await story.createContent({
              type,
              description,
              image0Id: image0 ? image0.id : undefined,
              image1Id: image1 ? image1.id : undefined,
              index: contentIndex,
              videoUrl: content.video || undefined
            })

            contentIndex++
          }
        }

        for (let oldStory of objStories) {
          if (oldStory.relatedStoriesLocalIds) {
            let story = await Story.findOne({
              where: {
                localId: oldStory.objLocalId,
                organizationId: Org.id
              }
            })

            let relatedStories = await Story.findAll({
              where: {
                localId: {
                  [Op.or]: oldStory.relatedStoriesLocalIds.map(lid => lid)
                },
                organizationId: Org.id
              }
            })

            await story.addRelatedStories(relatedStories)
          }
        }
      } catch (ex) {
        console.error(ex)
      }
    }

    await create('https://new.artsmia.org/crashpad/', Mia)

    await create('https://new.artsmia.org/teachers-crashpad/', Africa)

    log('Success')
  } catch (ex) {
    console.error(ex)
    process.exit(1)
  } finally {
    process.exit()
  }
}

populate()
