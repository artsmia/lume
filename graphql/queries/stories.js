import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList
} from 'graphql'
import storyType from '../types/story'
import {FilterInput} from '../types/inputs'
import resolve from '../resolvers/stories'

const stories = {
  name: "stories",
  type: new GraphQLList(storyType),
  args: {
    filter: {
      type: FilterInput
    },
  },
  resolve
}

export default stories
