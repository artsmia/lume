import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} from 'graphql'
import resolve from '../resolvers/deleteCategory'

const deleteCategory = {
  name: "deleteCategory",
  type: GraphQLString,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve
}

export default deleteCategory
