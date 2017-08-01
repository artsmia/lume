import {
  GraphQLString
} from 'graphql'
import itemType from '../types/item'
import itemModel from '../../db/models/item'

const item = {
  type: itemType,
  args: {
    id: {
      type: GraphQLString
    },
  },
  resolve: async (src, {id}) => {
    try {

      const result = await itemModel.findById(id)
      return result
    } catch (ex) {
      console.log("Item error")
      return "Item error"
    }
  }
}

export default item
