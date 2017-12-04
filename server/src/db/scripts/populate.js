import 'dotenv/config'
import fetch from 'isomorphic-unfetch'
import db from '../connect'
import {createAssociations} from '../associations'
import organizationModel from '../models/organization'
import objModel from '../models/obj'
import detailModel from '../models/detail'
import imageModel from '../models/image'
import thematicModel from '../models/thematic'
import pageModel from '../models/page'


async function populate() {
  try {

    await createAssociations()

    const response = await fetch("https://new.artsmia.org/crashpad/")
    const json = await response.json()

    let organization
    let mcn


    const createOrganization = async () => {
      try {

        organization = await organizationModel.create({
          subdomain: "mia",
          name: "Minneapolis Institute of Art",
          customObjApiEnabled: true,
          customObjApiEndpoint: "http://localhost:5000/mia/obj",
          customImageApiEnabled: true,
          customImageEndpoint: "http://localhost:5000/mia/image"
        })

        mcn = await organizationModel.create({
          subdomain: "mcn",
          name: "Museum Computer Network",
        })


      } catch (ex) {
        console.error(ex)
        process.exit(1)
      }
    }


    const createObjs = async () => {
      try {

        const localIds = Object.keys(json.objects)

        const objs = localIds.map( (localId) => ({
          localId,
          pullFromCustomApi: true,
          organizationId: organization.id,
          ...json.objects[localId],
          text: json.objects[localId].description,
          id: undefined
        }))


        for (let obj of objs) {
          await createObj(obj)
        }


      } catch (ex) {
        console.error(ex)
        process.exit(1)
      }
    }

    const createDetail = async(detail) => {
      try {

        const newDetail = await detailModel.create(detail)
        const [newImage, isNew] = await imageModel.findCreateFind({
          where: {
            localId: detail.localImageId,
          }
        })

        if (isNew) {
          await organization.addImage(newImage)
        }

        await newDetail.setImage(newImage)
        return newDetail
      } catch (ex) {
        console.error(ex)
        process.exit(1)
      }
    }


    const createObj = async(obj) => {
      try {
        const newObj = await objModel.create(obj)

        await organization.addObj(newObj)

        let details = []

        let index = 0

        obj.views.forEach( (view) => {

          view.annotations.forEach( detail => {

            let {
              geometry
            } = detail.geoJSON
            geometry.coordinates = [
              geometry.coordinates[0].map( coord => ([coord[1] * 256, coord[0] * 256]) )
            ]

            details.push({
              ...detail,
              geometry,
              index,
              id: undefined,
              localImageId: view.image
            })
            index++
          })
        })

        let newDetails = []

        for (let detail of details) {
          newDetails.push(await createDetail(detail))
        }


        await newObj.addDetails(newDetails)

        const [newMainImage, isNew] = await imageModel.findCreateFind({
          where: {
            localId: obj.views[0].image
          }
        })

        if (isNew) {

          await organization.addImage(newMainImage)

        }

        await newObj.setMainImage(newMainImage)


      } catch (ex) {
        console.error(ex)
        process.exit(1)
      }
    }


    const createPage = async(page) => {
      try {
        const newPage = await pageModel.create(page)

        if (page.type === "image") {
          const [image, isNew] = await imageModel.findCreateFind({
            where: {
              localId: page.image
            }
          })

          if (isNew) {
            await organization.addImage(image)
          }

          await newPage.setMainImage(image)

        }

        if (page.type === "comparison") {
          const [comparisonImage0, image0IsNew] =  await imageModel.findCreateFind({
            where: {
              localId: page.image
            }
          })

          if (image0IsNew) {
            await organization.addImage(comparisonImage0)
          }

          await newPage.setComparisonImage0(comparisonImage0)

          const [comparisonImage1, image1IsNew] =  await imageModel.findCreateFind({
            where: {
              localId: page.imageB
            }
          })

          if (image1IsNew) {
            await organization.addImage(comparisonImage1)
          }

          await newPage.setComparisonImage1(comparisonImage1)
        }

        return newPage

      } catch (ex) {
        console.error(ex)
        process.exit(1)

      }
    }

    const createThematic = async(thematic) => {
      try {

        const newThematic = await thematicModel.create({
          ...thematic,
          id: undefined,
          localId: thematic.id
        })

        let pages = []

        let index = 0

        for (let page of thematic.pages) {
          pages.push(
            await createPage({
              ...page,
              index
            })
          )
          index++
        }

        await newThematic.setPages(pages)

        const objIds = Object.keys(json.objects)

        let objsToAssociate = []

        objIds.forEach( id => {
          let relatedStories = json.objects[id].relatedStories || []

          if (
            relatedStories.includes(thematic.localId)
          ) {
            objsToAssociate.push(id)
          }
        })

        const objs = await objModel.findAll({
          where: {
            localId: objsToAssociate
          }
        })

        await newThematic.addRelatedObjs(objs)

        await organization.addThematic(newThematic)


      } catch (ex) {
        console.error(ex)
        process.exit(1)
      }
    }


    const createThematics = async() => {
      try {
        const {
          stories
        } = json

        const storyIds = Object.keys(stories)

        const thematics = storyIds.map( (localId) => {

          let thematic = stories[localId]

          return {
            localId: parseInt(localId,10),
            ...thematic
          }
        })

        for (let thematic of thematics) {
          await createThematic(thematic)
        }


      } catch (ex) {
        console.error(ex)
        process.exit(1)
      }
    }

    await createOrganization()

    await createObjs()

    await createThematics()

    process.exit()

  } catch (ex) {
    console.error(ex)
    process.exit(1)
  }




}



populate()
