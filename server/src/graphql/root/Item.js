import itemModel from '../../db/models/item'

const Item = {
  async organizations(argItem) {
    try {
      const item = await itemModel.findById(argItem.id)

      return await item.getOrganizations()
    } catch (ex) {
      console.error(ex)
    }
  },
  async relatedItems(argItem) {
    try {
      const item = await itemModel.findById(argItem.id)

      return await item.getRelatedItems()
    } catch (ex) {
      console.error(ex)
    }
  },
  async relatedBooks(argItem) {
    try {
      const item = await itemModel.findById(argItem.id)

      return await item.getRelatedBooks()
    } catch (ex) {
      console.error(ex)
    }
  },
  async groups(argItem) {
    try {
      const item = await itemModel.findById(argItem.id)

      return await item.getGroups()
    } catch (ex) {
      console.error(ex)
    }
  },
  async details(argItem) {
    try {
      const item = await itemModel.findById(argItem.id)

      return await item.getDetails()
    } catch (ex) {
      console.error(ex)
    }
  },
  async mainImage(argItem) {
    try {
      const item = await itemModel.findById(argItem.id)

      return await item.getMainImage()
    } catch (ex) {
      console.error(ex)
    }
  },
}

export default Item
