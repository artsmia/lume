import bookModel from '../../db/models/book'

export default async function book(src, {id}, ctx){
  try {
    let book = await bookModel.findById(id)
    return book.dataValues
  } catch (ex) {
    console.error(ex)
  }
}
