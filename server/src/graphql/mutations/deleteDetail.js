import detailModel from '../../db/models/detail'
import objModel from '../../db/models/obj'


export default async function deleteDetail(src, {id}, ctx) {
  try {
    let detail = await detailModel.findById(id)
    let obj = await objModel.findById(detail.objId)
    await detail.destroy()
    return obj
    return
  } catch (ex) {
    console.error(ex)
  }
}
