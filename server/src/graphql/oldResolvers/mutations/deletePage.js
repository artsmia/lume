import pageModel from '../../db/models/page'
import thematicModel from '../../db/models/thematic'

export default async function deletePage(src, {id}, ctx) {
  try {
    let deletedPage = await pageModel.findById(id)
    let thematic = await thematicModel.findById(deletedPage.thematicId)

    let pages = await thematic.getPages()

    let pagesToUpdate = pages.filter(({index}) => index > deletedPage.index)


    await Promise.all(
      pagesToUpdate.map(page => page.update({index: page.index - 1}))
    )



    await deletedPage.destroy()
    return thematic
  } catch (ex) {
    console.error(ex)
  }
}
