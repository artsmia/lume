import detailModel from '../../db/models/detail'
import itemModel from '../../db/models/item'


export default async function editOrCreateImage(src, {id, itemId, title, imageId}, ctx){
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

    return detail
  } catch (ex) {
    console.error(ex)
  }
}
