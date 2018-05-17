import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql'
import categoryType from '../types/category'
import resolve from '../resolvers/category'

const category = {
  name: 'category',
  type: categoryType,
  args: {
    id: {
      type: GraphQLID
    }
  },
  resolve
}

export default category
