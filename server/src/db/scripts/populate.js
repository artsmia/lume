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

        await Promise.all(
          items.map(item => createItem(item))
        )




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

        item.views.forEach( (view) => {
          let index = 0
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

        let newDetails = await Promise.all(
          details.map( detail => createDetail(detail))
        )

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


    const createBook = async(book) => {
      try {

        const newBook = await bookModel.create({
          ...book,
          id: undefined,
          localId: book.id
        })

        const pages = await pageModel.bulkCreate(book.pages)

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

        await Promise.all(
          books.map( book => createBook(book))
        )


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
