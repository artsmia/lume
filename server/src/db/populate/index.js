import chalk from 'chalk'
import fetch from 'isomorphic-unfetch'
import itemModel from '../models/item'
import bookModel from '../models/book'
import pageModel from '../models/page'

export default async function() {
  try {

    const response = await fetch("https://new.artsmia.org/crashpad/")
    const json = await response.json()


    await createItems(json)

    await createBooks(json)

    await createPages(json)

  } catch (ex) {
    console.error("big function exception", ex)
  }
}




async function createPages(json){
  try {
    const oldBooks = json.stories

    const oldBookKeys = Object.keys(oldBooks)

    const pages = await Promise.all(
      oldBookKeys.map( miaId => pageSet(oldBooks[miaId]) )
    )


  } catch (ex) {
    console.error("createPages exception", ex)
  }
}


async function pageSet(oldBook){
  try {

    const newPages = oldBook.pages.map( (page, index) => {
      const {
        type,
        text,
        video
      } = page
      return {
        type,
        text,
        index,
        video
      }
    })

    const book = await bookModel.findOne({
      where: {
        miaId: oldBook.id
      }
    })

    const pages = await pageModel.bulkCreate(newPages)


    const createdPages = await book.addPages(pages)


  } catch (ex) {
    console.error("pageSet exception", ex)

  }
}




async function createBooks(json){
  try {
    const oldBooks = json.stories

    const oldBookKeys = Object.keys(oldBooks)

    const bookData = oldBookKeys.map( (miaId) => {
      return {
        miaId,
        title: oldBooks[miaId].title
      }
    })

    await bookModel.bulkCreate(bookData)

  } catch (ex) {
    console.error("createBooks exception", ex)
  }
}





async function createItems(json){
  try {


    const oldItems = json.objects

    const oldItemKeys = Object.keys(oldItems)

    const itemData = await Promise.all(
      oldItemKeys.map( miaItemId => getItemData(miaItemId) )
    )

    const rows = await itemModel.bulkCreate(itemData)


  } catch (ex) {
    console.error("creatItems error", ex)
  }
}


async function getItemData(id) {
  try {
    const response = await fetch(`https://search.artsmia.org/id/${id}`)
    const {
      id: miaId,
      title,
      medium,
      artist,
      dated,
      accession_number: accessionNumber,
      room: currentLocation,
      creditline: creditLine,
      text,
    } = await response.json()



    return {
      miaId,
      title,
      medium,
      artist,
      dated,
      accessionNumber,
      currentLocation,
      creditLine,
      text,
    }

  } catch (ex) {
    logEx("getItemData exception with", ex)
  }
}
