import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} from 'graphql'
import itemType from './item'
import groupModel from '../../db/models/group'


const group = new GraphQLObjectType({
  name: "group",
  fields: ()=> ({
    id: {
      type: GraphQLString
    },
    title: {
      type: GraphQLString
    },
    text: {
      type: GraphQLString
    },
    items: {
      type: new GraphQLList(itemType),
      resolve: async (group) => {
        try {

          const groupInst = await groupModel.findById(group.id)

          const items = await groupInst.getItems()

          return items
        } catch (ex) {
          console.log(ex)
        }
      }
    },
  })
})

export default group
