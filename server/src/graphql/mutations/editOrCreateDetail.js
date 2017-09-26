import detailModel from '../../db/models/detail'
import itemModel from '../../db/models/item'

export default async function editOrCreateDetail(src, {id, itemId, title, index, imageId, description, geometry, newAdditionalImageIds, removeAdditionalImageIds}, ctx){
  try {


    let detail

    if (!id) {
      detail = await detailModel.create({
      })
    } else {
      detail = await detailModel.findById(id)
    }

    if (itemId) {
      let item = await itemModel.findById(itemId)
      await item.addDetail(detail)
    }

    if (imageId) {
      detail = await detail.setImage(imageId)
    }

    if (newAdditionalImageIds){
      await detail.addAdditionalImages(newAdditionalImageIds)
    }

    if (removeAdditionalImageIds){
      await detail.removeAdditionalImages(removeAdditionalImageIds)
    }


    await detail.update({
      title,
      index,
      description,
      geometry
    },{
      where: {
        id
      }
    })


    detail = await detailModel.findById(id)


    return detail
  } catch (ex) {
    console.error(ex)
  }
}
