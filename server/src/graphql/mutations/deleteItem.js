import itemModel from '../../db/models/item'

export default async function deleteItem(src, {id}, ctx) {
  try {
    let item = await itemModel.findById(id)
    await item.destroy()
    return {
      message: "Item Deleted!"
    }
  } catch (ex) {
    console.error(ex)
  }
}
