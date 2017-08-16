import bookModel from '../../db/models/book'

const Book = {
  async pages(book){
    try {
      const book = await bookModel.findById(book.id)
      return await book.getPages()
    } catch (ex) {
      console.error(ex)
    }
  },
  async relatedItems(book){
    try {
      const book = await bookModel.findById(book.id)
      return await book.getRelatedItems()
    } catch (ex) {
      console.error(ex)
    }
  }
}

export default Book
