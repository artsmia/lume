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
      book = await bookModel.create()
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
      await pageModel.create({
        bookId,
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
