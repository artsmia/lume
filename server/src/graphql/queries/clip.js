import clipModel from '../../db/models/clip'

export default async function clip(src, {id}, ctx){
  try {
    return await clipModel.findById(id)
  } catch (ex) {
    console.error(ex)
  }
}
