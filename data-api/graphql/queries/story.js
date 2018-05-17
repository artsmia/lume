import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} from 'graphql'
import storyType from '../types/story'
import resolve from '../resolvers/story'
import { StorySlugInput } from '../types/inputs'

const story = {
  name: 'story',
  type: storyType,
  args: {
    id: {
      type: GraphQLID
    },
    slugInput: {
      type: StorySlugInput
    }
  },
  resolve
}

export default story
