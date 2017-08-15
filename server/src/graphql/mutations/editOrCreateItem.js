import itemModel from '../../db/models/item'


export default async function editOrCreateItem(src, args, ctx){
  try {
    const {
      item: argItem,
      item: {
        id
      },
      newOrganizationIds,
      mainImageId,
      newRelatedItemIds,
      newDetailIds,
      newRelatedBookIds,
      newGroupIds,
    } = args
    let item
    if (!id) {
      item = await itemModel.create(argItem)
    }

    await itemModel.update(argItem, {
      where: {
        id: id
      }
    })
    item = await itemModel.findById(argItem.id)


    if (newOrganizationIds) {
      await item.addOrganizations(newOrganizationIds)
    }

    if (mainImageId) {
      await item.addMainImage(mainImageId)
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

    if (newRelatedGroupIds) {
      await item.addGroups(newRelatedGroupIds)
    }

    return item
  } catch (ex) {
    console.error(ex)
  }
}
