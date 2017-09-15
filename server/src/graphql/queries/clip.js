import clipModel from '../../db/models/clip'

export default async function clip(src, {id}, ctx){
  try {

    let clip = await clipModel.findById(id)
    return clip
  } catch (ex) {
    console.error(ex)
  }
}
