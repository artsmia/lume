import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} from 'graphql'
import storyType from '../types/story'
import resolve from '../resolvers/story'

const story = {
  name: "story",
  type: storyType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
  },
  resolve
}

export default story
