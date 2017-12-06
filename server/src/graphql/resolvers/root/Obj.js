import objModel from '../../db/models/obj'

const Obj = {
  async organizations(argObj) {
    try {
      const obj = await objModel.findById(argObj.id)

      return await obj.getOrganizations()
    } catch (ex) {
      console.error(ex)
    }
  },
  async relatedObjs(argObj) {
    try {
      const obj = await objModel.findById(argObj.id)

      return await obj.getRelatedObjs()
    } catch (ex) {
      console.error(ex)
    }
  },
  async relatedThematics(argObj) {
    try {
      const obj = await objModel.findById(argObj.id)

      return await obj.getRelatedThematics()
    } catch (ex) {
      console.error(ex)
    }
  },
  async groups(argObj) {
    try {
      const obj = await objModel.findById(argObj.id)

      return await obj.getGroups()
    } catch (ex) {
      console.error(ex)
    }
  },
  async details(argObj) {
    try {
      const obj = await objModel.findById(argObj.id)
      return await obj.getDetails()
    } catch (ex) {
      console.error(ex)
    }
  },
  async mainImage(argObj) {
    try {
      const obj = await objModel.findById(argObj.id)

      return await obj.getMainImage()
    } catch (ex) {
      console.error(ex)
    }
  },
}

export default Obj
