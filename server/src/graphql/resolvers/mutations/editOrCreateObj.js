import objModel from '../../db/models/obj'
import detailModel from '../../db/models/detail'


export default async function editOrCreateObj(src, args, ctx){
  try {
    const {
      obj: argObj,
      newOrganizationIds,
      mainImageId,
      newRelatedObjIds,
      newRelatedThematicIds,
      newGroupIds,
      createAndAddDetail: {
        objId: createAndAddDetailObjId,
        imageId
      },
      removeRelatedThematicIds
    } = args
    let obj
    if (!argObj.id) {
      obj = await objModel.create({
        ...argObj,
        title: "New Obj"
      })
    } else {
      obj = await objModel.update(argObj, {
        where: {
          id: argObj.id
        }
      })
      obj = await objModel.findById(argObj.id)
    }

    if (newOrganizationIds) {
      await obj.addOrganizations(newOrganizationIds)


    }


    if (mainImageId) {
      await obj.setMainImage(mainImageId)
    }

    if (newRelatedObjIds) {
      await obj.addRelatedObjs(newRelatedObjIds)
    }


    if (newRelatedThematicIds) {
      await obj.addRelatedThematics(newRelatedThematicIds)
    }

    if (removeRelatedThematicIds) {
      await obj.removeRelatedThematics(removeRelatedThematicIds)
    }

    if (newGroupIds) {
      await obj.addGroups(newRelatedGroupIds)
    }

    if (createAndAddDetailObjId) {

      let details = await obj.getDetails()


      await detailModel.create({
        objId: createAndAddDetailObjId,
        imageId,
        index: details.length
      })

      obj = await objModel.findById(argObj.id)

    }



    return obj
  } catch (ex) {
    console.error(ex)
  }
}
