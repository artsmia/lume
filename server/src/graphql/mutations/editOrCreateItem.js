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
      createAndAddDetail: {
        itemId: createAndAddDetailItemId,
        imageId
      },
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

      console.log(await item.addOrganizations(newOrganizationIds))


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

    if (createAndAddDetailItemId) {

      let details = await item.getDetails()


      await detailModel.create({
        itemId: createAndAddDetailItemId,
        imageId,
        index: details.length
      })

      item = await itemModel.findById(argItem.id)

    }


    return item
  } catch (ex) {
    console.error(ex)
  }
}
