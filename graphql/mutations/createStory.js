import {
  GraphQLID,
  GraphQLNonNull
} from 'graphql'
import storyType from '../types/story'
import resolve from '../resolvers/createStory'

const createStory = {
  name: "story",
  type: storyType,
  args: {
    organizationId: {
      type: new GraphQLNonNull(GraphQLID)
    },
    creatorId: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve
}

export default createStory
