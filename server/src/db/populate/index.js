import chalk from 'chalk'
import fetch from 'isomorphic-unfetch'
import itemModel from '../models/item'
import bookModel from '../models/book'


function logEx (msg) {
  console.log(chalk.red("Error Message: \n"))
  console.log(msg)
}


export default async function() {
  try {

    const response = await fetch("https://new.artsmia.org/crashpad/")
    const json = await response.json()


    await createItems(json)

    await createBooks(json)

  } catch (ex) {
    logEx("big function exception", ex)
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
    logEx("createBooks exception", ex)
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
