import itemModel from '../../db/models/item'


export default async function editOrCreateItem(src, args, ctx){
  try {
    if (!args.id) {
      return await itemModel.create({
        ...args
      })
    } else {
      return await itemModel.upsert({
        ...args
      })
    }
  } catch (ex) {
    console.error(ex)
  }
}
