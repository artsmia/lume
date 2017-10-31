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
      }
    }


    const createItems = async () => {
      try {

        const localIds = Object.keys(json.objects)

        const items = localIds.map( (localId) => ({
          localId,
          pullFromCustomApi: true,
          organizationId: organization.id,
          ...json.objects[localId]
        }))

        await Promise.all(
          items.map(item => createItem(item))
        )




      } catch (ex) {
        console.error(ex)
      }
    }

    const createItem = async(item) => {
      try {
        const newItem = await itemModel.create(item)

        await organization.addItem(newItem)

        const details = item.views[0].annotations.map( (detail, index) => ({
          ...detail,
          geometry: detail.geoJSON.geometry,
          index,
          id: undefined
        }))

        const newDetails = await detailModel.bulkCreate(details)

        await newItem.addDetails(newDetails)

        const imageIds = item.views.map( view => ({
          localId: view.image,
        }))

        const newMainImage = await imageModel.create(imageIds[0])

        await newMainImage.setOrganization(organization)

        await newItem.setMainImage(newMainImage)


      } catch (ex) {
        console.error(ex)
      }
    }


    const createBook = async(book) => {
      try {

        const newBook = await bookModel.create({
          ...book,
          id: undefined
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

        const item = await itemModel.findAll({
          where: {
            localId: itemsToAssociate
          }
        })

        await newBook.addRelatedItems(item)

        await organization.addBook(newBook)



      } catch (ex) {
        console.error(ex)
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
            localId,
            ...book
          }
        })

        await Promise.all(
          books.map( book => createBook(book))
        )


      } catch (ex) {
        console.error(ex)
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
