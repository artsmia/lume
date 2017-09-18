import detailModel from '../../db/models/detail'
import itemModel from '../../db/models/item'
import clipModel from '../../db/models/clip'

export default async function editOrCreateDetail(src, {id, itemId, title, index, imageId, createAndAddClip}, ctx){
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

    if (createAndAddClip.detailId) {

      console.log(detail)

      let clips = await detail.getClips()

      await clipModel.create({
        detailId: createAndAddClip.detailId,
        index: clips.length
      })
    }

    if (title) {
      detail.update({title})
    }

    if (index) {
      detail.update({index})
    }

    return detail
  } catch (ex) {
    console.error(ex)
  }
}
