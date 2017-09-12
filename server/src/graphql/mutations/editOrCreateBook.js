import bookModel from '../../db/models/book'
import pageModel from '../../db/models/page'

export default async function editOrCreateBook(src, args, ctx){
  try {
    const {
      newOrganizationIds,
      createAndAddPage
    } = args

    let book = args



    if (!book.id){
      book = await bookModel.create()
    } else {
      book = await bookModel.findById(book.id)
      book = await book.update({
        title: book.title
      })
    }

    if (newOrganizationIds) {
      await book.addOrganizations(newOrganizationIds)
    }

    if (createAndAddPage) {
      const {
        bookId,
      } = createAndAddPage
      await pageModel.create({
        bookId,
      })

    }

    return book
  } catch (ex) {
    console.error(ex)
  }
}
