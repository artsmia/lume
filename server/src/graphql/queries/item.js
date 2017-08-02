import {
  GraphQLString
} from 'graphql'
import itemType from '../types/item'
import itemModel from '../../db/models/item'
import detailModel from '../../db/models/detail'

const item = {
  type: itemType,
  args: {
    id: {
      type: GraphQLString
    },
  },
  resolve: async (src, {id}) => {
    try {

      const itemInst = await itemModel.findById(id)

      return {
        ...itemInst.dataValues
      }
    } catch (ex) {
      console.log("Item error", ex)
      return "Item error"
    }
  }
}

export default item
