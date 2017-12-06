import objModel from '../../db/models/obj'

export default async function deleteObj(src, {id}, ctx) {
  try {
    let obj = await objModel.findById(id)
    await obj.destroy()
    return {
      message: "Obj Deleted!"
    }
  } catch (ex) {
    console.error(ex)
  }
}
