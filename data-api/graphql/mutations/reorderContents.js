import { GraphQLID, GraphQLString, GraphQLNonNull, GraphQLList } from 'graphql'
import storyType from '../types/story'

import resolve from '../resolvers/reorderContents'

const reorderContents = {
  name: 'reorderContents',
  type: storyType,
  args: {
    storyId: {
      type: new GraphQLNonNull(GraphQLID)
    },
    contentIds: {
      type: new GraphQLList(GraphQLID)
    }
  },
  resolve
}

export default reorderContents
