import itemModel from '../../db/models/item'


export default async function editOrCreateItem(src, args, ctx){
  try {
    const {
      item: argItem,
      newOrganizationIds,
      mainImageId,
      newRelatedItemIds,
      newDetailIds,
      newRelatedBookIds,
      newGroupIds,
    } = args
    let item
    if (!argItem) {
      item = await itemModel.create(argItem)
    }

    if (argItem) {
      item = await itemModel.update(argItem, {
        where: {
          id: argItem.id
        }
      })
      item = await itemModel.findById(argItem.id)

    }



    if (newOrganizationIds) {
      await item.addOrganizations(newOrganizationIds)
    }

    if (mainImageId) {
      await item.setMainImage(mainImageId)
    }

    if (newRelatedItemIds) {
      await item.addRelatedItems(newRelatedItemIds)
    }

    if (newDetailIds) {
      await item.addDetails(newDetailIds)
    }

    if (newRelatedBookIds) {
      await item.addRelatedBooks(newRelatedBookIds)
    }

    if (newGroupIds) {
      await item.addGroups(newRelatedGroupIds)
    }

    return item
  } catch (ex) {
    console.error(ex)
  }
}
