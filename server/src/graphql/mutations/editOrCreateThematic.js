import thematicModel from '../../db/models/thematic'
import pageModel from '../../db/models/page'

export default async function editOrCreateThematic(src, args, ctx){
  try {
    const {
      newOrganizationIds,
      createAndAddPage,
      previewImageId
    } = args

    let thematic



    if (!args.id){
      thematic = await thematicModel.create({
        title: "New Thematic"
      })
    } else {
      thematic = await thematicModel.update(args, {
        where: {
          id: args.id
        }
      })
      thematic = await thematicModel.findById(args.id)

    }

    if (newOrganizationIds) {
      await thematic.addOrganizations(newOrganizationIds)
    }

    if (createAndAddPage) {
      const {
        thematicId,
      } = createAndAddPage

      let pages = await thematic.getPages()

      await pageModel.create({
        thematicId,
        index: pages.length,
        type: 'image'
      })
    }

    if (previewImageId) {
      await thematic.setPreviewImage(previewImageId)
    }

    return thematic
  } catch (ex) {
    console.error(ex)
  }
}
