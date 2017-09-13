import bookModel from '../../db/models/book'


export default async function deleteBook(src, {id}, ctx) {
  try {
    let book = await bookModel.findById(id)
    await book.destroy()
    return item
    return
  } catch (ex) {
    console.error(ex)
  }
}
