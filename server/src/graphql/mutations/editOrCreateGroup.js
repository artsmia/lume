import {
  GraphQLString,
  GraphQLList
} from 'graphql'
import groupType from '../types/group'
import groupModel from '../../db/models/group'
import itemModel from '../../db/models/item'


const editOrCreateGroup = {
  type: groupType,
  args: {
    id: {
      type: GraphQLString
    },
    title: {
      type: GraphQLString
    },
    text: {
      type: GraphQLString
    },
    addItemIds: {
      type: new GraphQLList(GraphQLString)
    },
    removeItemIds: {
      type: new GraphQLList(GraphQLString)
    },
  },
  resolve: async (src, {
    id,
    title,
    text,
    addItemIds,
    removeItemIds
  }) => {
    try {

      let group

      if (id) {
        await groupModel.update({
          title,
          text
        },{
          where: {
            id
          }
        })
        group = await groupModel.findById(id)
      } else {
        group = await groupModel.create({
          title,
          text
        })
      }

      if (addItemIds) {
        const newItems = await Promise.all(
          addItemIds.map( id => itemModel.findById(id))
        )
        await group.addItems(newItems)
      }

      return group
    } catch (ex) {
      console.log("editOrCreateGroup error", ex)
      return "editOrCreateGroup error"
    }
  }
}

export default editOrCreateGroup
