import detailModel from '../../db/models/detail'
import itemModel from '../../db/models/item'


export default async function deleteDetail(src, {id}, ctx) {
  try {
    let detail = await detailModel.findById(id)
    let item = await itemModel.findById(detail.itemId)
    await detail.destroy()
    return item
    return
  } catch (ex) {
    console.error(ex)
  }
}
