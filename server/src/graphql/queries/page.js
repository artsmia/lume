import pageModel from '../../db/models/page'

export default async function page(src, {id}, ctx){
  try {
    return await pageModel.findById(id)
  } catch (ex) {
    console.error(ex)
  }
}
