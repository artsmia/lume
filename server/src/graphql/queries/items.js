import itemModel from '../../db/models/item'


export default async function items(src, args, ctx){
  try {
    return await itemModel.findAll()
  } catch (ex) {
    console.error(ex)
  }
}
