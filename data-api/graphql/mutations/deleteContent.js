import { GraphQLID, GraphQLString, GraphQLNonNull } from 'graphql'
import resolve from '../resolvers/deleteContent'

const deleteContent = {
  name: 'deleteContent',
  type: GraphQLString,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve
}

export default deleteContent
