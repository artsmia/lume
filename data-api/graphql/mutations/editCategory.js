import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
} from 'graphql'
import categoryType from '../types/category'
import resolve from '../resolvers/editCategory'

const editCategory = {
  name: "editCategory",
  type: categoryType,
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
    imageId: {
      type: GraphQLID
    },
  },
  resolve
}

export default editCategory
