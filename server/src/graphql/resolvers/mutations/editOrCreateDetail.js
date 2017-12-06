import detailModel from '../../db/models/detail'
import objModel from '../../db/models/obj'

export default async function editOrCreateDetail(src, {id, objId, title, index, imageId, description, geometry, newAdditionalImageIds, removeAdditionalImageIds}, ctx){
  try {


    let detail

    if (!id) {
      detail = await detailModel.create({
      })
    } else {
      detail = await detailModel.findById(id)
    }

    if (objId) {
      let obj = await objModel.findById(objId)
      await obj.addDetail(detail)
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
