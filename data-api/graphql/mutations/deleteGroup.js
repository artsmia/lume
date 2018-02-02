import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} from 'graphql'
import resolve from '../resolvers/deleteGroup'

const deleteGroup = {
  name: "deleteGroup",
  type: GraphQLString,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve
}

export default deleteGroup
