import groupModel from '../../db/models/group'

export default async function group(src, {id}, ctx){
  try {
    return await groupModel.findById(id)
  } catch (ex) {
    console.error(ex)
  }
}
