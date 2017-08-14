import itemModel from '../../db/models/item'


export default async function editOrCreateItem(src, {item}, ctx){
  try {
    if (!item.id) {
      return await itemModel.create(item)
    } else {
      await itemModel.update(item, {
        where: {
          id: item.id
        }
      })
      return await itemModel.findById(item.id)
    }
  } catch (ex) {
    console.error(ex)
  }
}
