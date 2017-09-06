import clipModel from '../../db/models/clip'
import detailModel from '../../db/models/detail'

export default async function deleteClip(src, {id}, ctx) {
  try {
    let clip = await clipModel.findById(id)
    let detail = await detailModel.findById(clip.detailId)

    await clip.destroy()
    return detail
  } catch (ex) {
    console.error(ex)
  }
}
