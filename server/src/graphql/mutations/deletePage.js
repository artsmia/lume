import pageModel from '../../db/models/page'
import bookModel from '../../db/models/book'

export default async function deletePage(src, {id}, ctx) {
  try {
    let deletedPage = await pageModel.findById(id)
    let book = await bookModel.findById(deletedPage.bookId)

    let pages = await book.getPages()

    let pagesToUpdate = pages.filter(({index}) => index > deletedPage.index)


    await Promise.all(
      pagesToUpdate.map(page => page.update({index: page.index - 1}))      
    )



    await deletedPage.destroy()
    return book
  } catch (ex) {
    console.error(ex)
  }
}
