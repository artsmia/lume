import {
  GraphQLList,
  GraphQLInt
} from 'graphql'
import groupType from '../types/group'
import groupModel from '../../db/models/group'

const allItems = {
  type: new GraphQLList(groupType),
  args: {
    first: {
      type: GraphQLInt
    },
  },
  resolve: async (src, args) => {
    try {
      const items = await groupModel.findAll()
      return [...items]
    } catch (ex) {
      console.log("allGroups error")
      return "allGroups error"
    }
  }
}

export default allItems
