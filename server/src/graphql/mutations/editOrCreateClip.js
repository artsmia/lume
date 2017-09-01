import clipModel from '../../db/models/clip'

export default async function editOrCreateClip(src, {id: clipId, title, description, detailId, newAdditionalImageIds}, ctx){
  try {
    let clip

    console.log(clipId, newAdditionalImageIds)

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

    if (newAdditionalImageIds) {
      await clip.addAdditionalImages(newAdditionalImageIds)
    }


    return clip
  } catch (ex) {
    console.error(ex)
  }
}
