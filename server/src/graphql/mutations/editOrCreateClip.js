import clipModel from '../../db/models/clip'

export default async function editOrCreateClip(src, {clipId, title, description, detailId}, ctx){
  try {
    let clip
    if (clipId) {
      clip = await clipModel.findById(clipId)
    } else {
      clip = await clipModel.create()
    }

    clip = await clip.update({
      title,
      description,
      detailId
    })

    return clip
  } catch (ex) {
    console.error(ex)
  }
}
