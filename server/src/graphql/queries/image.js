import imageModel from '../../db/models/image'

export default async function image(src, {id}, ctx){
  try {
    return await imageModel.findById(id)
  } catch (ex) {
    console.error(ex)
  }
}
