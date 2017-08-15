import bookModel from '../../db/models/book'

export default async function book(src, {id}, ctx){
  try {
    return await bookModel.findById(id)
  } catch (ex) {
    console.error(ex)
  }
}
