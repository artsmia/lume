import itemModel from '../../db/models/item'
import detailModel from '../../db/models/detail'


export default async function editOrCreateItem(src, args, ctx){
  try {
    const {
      item: argItem,
      newOrganizationIds,
      mainImageId,
      newRelatedItemIds,
      newRelatedBookIds,
      newGroupIds,
      createAndAddDetail,
      removeRelatedBookIds
    } = args
    let item
    if (!argItem.id) {
      item = await itemModel.create({
        ...argItem,
        title: "New Item"
      })
    } else {
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


    if (newRelatedBookIds) {
      await item.addRelatedBooks(newRelatedBookIds)
    }

    if (removeRelatedBookIds) {
      await item.removeRelatedBooks(removeRelatedBookIds)
    }

    if (newGroupIds) {
      await item.addGroups(newRelatedGroupIds)
    }

    if (createAndAddDetail) {
      const {
        itemId,
        imageId
      } = createAndAddDetail
      const detail = await detailModel.create({
        itemId,
        imageId
      })

    }

    return item
  } catch (ex) {
    console.error(ex)
  }
}
