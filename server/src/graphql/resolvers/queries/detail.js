import detailModel from '../../db/models/detail'

export default async function detail(src, {id}, ctx){
  try {
    return await detailModel.findById(id)
  } catch (ex) {
    console.error(ex)
  }
}
