import clipModel from '../../db/models/clip'

export default async function editOrCreateClip(src, {id: clipId, title, description, detailId, newAdditionalImageIds, geometry}, ctx){
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
      detailId,
      geometry
    })

    if (newAdditionalImageIds) {
      await clip.addAdditionalImages(newAdditionalImageIds)
    }

    clip = await clipModel.findById(clip.id)

    return clip
  } catch (ex) {
    console.error(ex)
  }
}
