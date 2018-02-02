import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
} from 'graphql'
import groupType from '../types/group'
import resolve from '../resolvers/editGroup'

const editGroup = {
  name: "editGroup",
  type: groupType,
  args: {
    id: {
      type: GraphQLID
    },
    title: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    categoryId: {
      type: GraphQLID
    },
  },
  resolve
}

export default editGroup
