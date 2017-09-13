import pageModel from '../../db/models/page'
import bookModel from '../../db/models/book'

export default async function deletePage(src, {id}, ctx) {
  try {
    let page = await pageModel.findById(id)
    let book = await bookModel.findById(page.bookId)
    await page.destroy()
    return book
  } catch (ex) {
    console.error(ex)
  }
}
