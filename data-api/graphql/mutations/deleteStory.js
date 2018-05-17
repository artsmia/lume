import { GraphQLID, GraphQLString, GraphQLNonNull } from 'graphql'
import resolve from '../resolvers/deleteStory'

const deleteStory = {
  name: 'deleteStory',
  type: GraphQLString,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve
}

export default deleteStory
