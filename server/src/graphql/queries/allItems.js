import {
  GraphQLList,
  GraphQLInt
} from 'graphql'
import itemType from '../types/item'
import itemModel from '../../db/models/item'

const allItems = {
  type: new GraphQLList(itemType),
  args: {
    first: {
      type: GraphQLInt
    },
  },
  resolve: async (src, args) => {
    try {
      const items = await itemModel.findAll()
      return [...items]
    } catch (ex) {
      console.log("allItems error")
      return "allItems error"
    }
  }
}

export default allItems
