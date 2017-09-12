import bookModel from '../../db/models/book'

const Book = {
  async pages({id}){
    try {

      const book = await bookModel.findById(id)

      return await book.getPages()
    } catch (ex) {
      console.error(ex)
    }
  },
  async relatedItems({id}){
    try {
      const book = await bookModel.findById(id)
      return await book.getRelatedItems()
    } catch (ex) {
      console.error(ex)
    }
  },
  async previewImage({id}){
    try {

      const book = await bookModel.findById(id)

      return await book.getPreviewImage()
    } catch (ex) {
      console.error(ex)
    }
  },
}

export default Book
