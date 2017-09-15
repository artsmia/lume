import bookModel from '../../db/models/book'
import pageModel from '../../db/models/page'

export default async function editOrCreateBook(src, args, ctx){
  try {
    const {
      newOrganizationIds,
      createAndAddPage,
      previewImageId
    } = args

    let book



    if (!args.id){
      book = await bookModel.create({
        title: "New Book"
      })
    } else {
      book = await bookModel.update(args, {
        where: {
          id: args.id
        }
      })
      book = await bookModel.findById(args.id)

    }

    if (newOrganizationIds) {
      await book.addOrganizations(newOrganizationIds)
    }

    if (createAndAddPage) {
      const {
        bookId,
      } = createAndAddPage

      let pages = await book.getPages()

      await pageModel.create({
        bookId,
        index: pages.length
      })
    }

    if (previewImageId) {
      await book.setPreviewImage(previewImageId)
    }

    return book
  } catch (ex) {
    console.error(ex)
  }
}
