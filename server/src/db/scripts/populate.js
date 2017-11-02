import 'dotenv/config'
import fetch from 'isomorphic-unfetch'
import db from '../connect'
import {createAssociations} from '../associations'
import organizationModel from '../models/organization'
import itemModel from '../models/item'
import detailModel from '../models/detail'
import imageModel from '../models/image'
import bookModel from '../models/book'
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
          customItemApiEnabled: true,
          customItemApiEndpoint: "http://localhost:5000/mia/item",
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


    const createItems = async () => {
      try {

        const localIds = Object.keys(json.objects)

        const items = localIds.map( (localId) => ({
          localId,
          pullFromCustomApi: true,
          organizationId: organization.id,
          ...json.objects[localId],
          text: json.objects[localId].description,
          id: undefined
        }))


        for (let item of items) {
          await createItem(item)
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


    const createItem = async(item) => {
      try {
        const newItem = await itemModel.create(item)

        await organization.addItem(newItem)

        let details = []

        let index = 0

        item.views.forEach( (view) => {

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


        await newItem.addDetails(newDetails)

        const [newMainImage, isNew] = await imageModel.findCreateFind({
          where: {
            localId: item.views[0].image
          }
        })

        if (isNew) {

          await organization.addImage(newMainImage)

        }

        await newItem.setMainImage(newMainImage)


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

    const createBook = async(book) => {
      try {

        const newBook = await bookModel.create({
          ...book,
          id: undefined,
          localId: book.id
        })

        let pages = []

        let index = 0

        for (let page of book.pages) {
          pages.push(
            await createPage({
              ...page,
              index
            })
          )
          index++
        }

        await newBook.setPages(pages)

        const itemIds = Object.keys(json.objects)

        let itemsToAssociate = []

        itemIds.forEach( id => {
          let relatedStories = json.objects[id].relatedStories || []

          if (
            relatedStories.includes(book.localId)
          ) {
            itemsToAssociate.push(id)
          }
        })

        const items = await itemModel.findAll({
          where: {
            localId: itemsToAssociate
          }
        })

        await newBook.addRelatedItems(items)

        await organization.addBook(newBook)


      } catch (ex) {
        console.error(ex)
        process.exit(1)
      }
    }


    const createBooks = async() => {
      try {
        const {
          stories
        } = json

        const storyIds = Object.keys(stories)

        const books = storyIds.map( (localId) => {

          let book = stories[localId]

          return {
            localId: parseInt(localId,10),
            ...book
          }
        })

        for (let book of books) {
          await createBook(book)
        }


      } catch (ex) {
        console.error(ex)
        process.exit(1)
      }
    }

    await createOrganization()

    await createItems()

    await createBooks()

    process.exit()

  } catch (ex) {
    console.error(ex)
    process.exit(1)
  }




}



populate()
