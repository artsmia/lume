import 'dotenv/config'
import fetch from 'isomorphic-unfetch'
import chalk from 'chalk'
import db from '../lume-api/db/connect'
import {createAssociations} from '../lume-api/db/associations'
import Organization from '../lume-api/db/models/Organization'
import Story from '../lume-api/db/models/Story'
import Image from '../lume-api/db/models/Image'
import data from './mia-data'

const log = (msg) => console.log(chalk.cyan(msg))

async function populate(){

  try {

    await createAssociations()

    const {
      objects: originals,
      stories: sliders,
    } = data


    const Mia = await Organization.create({
      subdomain: "mia",
      name: "Minneapolis Institute of Art",
      customObjApiEnabled: true,
      customObjApiEndpoint: " https://iexj7ikn39.execute-api.us-west-2.amazonaws.com/prod/lume-mia-micro",
      customImageApiEnabled: true,
      customImageEndpoint: "http://localhost:5000/mia/image"
    })

    let objStories = Object.keys(originals).map(key => {
      let story = originals[key]

      return {
        primaryImageLocalId: story.views[0].image,
        objLocalId: story.id,
        objContentTitle: story.title,
        objContentDescription: story.description,
        views: story.views
      }
    })

    for (let oldStory of objStories) {

      let image = await Mia.createImage({
        localId: oldStory.primaryImageLocalId
      })

      let story = await Mia.createStory({
        template: "original",
        previewImageId: image.id,
        visibility: "published",
        title: oldStory.objContentTitle,
      })

      let obj = await Mia.createObj({
        localId: oldStory.objLocalId,
        pullFromCustomApi: true,
        primaryMediaType: "image",
        primaryImageId: image.id
      })

      let contentIndex = 0

      let objContent = await story.createContent({
        type: "obj",
        title: oldStory.objContentTitle,
        description: oldStory.objContentDescription,
        objId: obj.id,
        index: contentIndex
      })

      for (let view of oldStory.views) {
        let [detailImage] = await Image.findOrCreate({
          where: {
            localId: view.image
          },
          defaults: {
            organizationId: Mia.id
          }
        })

        for (let detail of view.annotations) {
          let geometry = {
            type: "Polygon",
            coordinates: [
              detail.geoJSON.geometry.coordinates[0].map( coord => ([coord[1] * 256, coord[0] * 256]) )
            ]
          }

          contentIndex ++

          await story.createContent({
            type: "detail",
            title: detail.title,
            description: detail.description,
            geometry,
            index: contentIndex,
            image0Id: detailImage.id
          })
        }
      }
    }


    let slideStories = Object.keys(sliders).map( key => {
      let story = sliders[key]

      return {
        title: story.title,
        contents: story.pages
      }
    })


    for (let oldStory of slideStories){

      let story = await Mia.createStory({
        template: "slider",
        visibility: "published",
        title: oldStory.title,
      })

      let contentIndex = 0

      let hasImage = false

      for (let content of oldStory.contents){

        let image0
        let image1
        let type

        if (
          content.type === "image"
        ) {
          type = "picture"
          let result = await Image.findOrCreate({
            where: {
              localId: content.image
            },
            defaults: {
              organizationId: Mia.id
            }
          })
          image0 = result[0]

          if (!hasImage){
            await story.setPreviewImage(image0)
          }


        }

        if (
          content.type === "comparison"
        ) {
          type = "comparison"
          let result = await Image.findOrCreate({
            where: {
              localId: content.image
            },
            defaults: {
              organizationId: Mia.id
            }
          })
          image0 = result[0]
          result = await Image.findOrCreate({
            where: {
              localId: content.imageB
            },
            defaults: {
              organizationId: Mia.id
            }
          })

          image1 = result[0]
        }

        if (
          content.type === "video"
        ) {
          type = "movie"
        }

        await story.createContent({
          type,
          description: content.text,
          image0Id: image0 ? image0.id : undefined,
          image1Id: image1 ? image1.id : undefined,
          index: contentIndex,
          videoUrl: content.video || undefined
        })

        contentIndex++
      }
    }



    log("Success")

  } catch (ex) {
    console.error(ex)
    process.exit(1)
  } finally {
    process.exit()

  }
}

populate()
