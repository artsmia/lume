import {
  GraphQLID,
  GraphQLNonNull
} from 'graphql'
import storyType from '../types/story'
import resolve from '../resolvers/createStory'
import {OrganizationInput} from '../types/inputs'


const createStory = {
  name: "createStory",
  type: storyType,
  args: {
    organization: {
      type: new GraphQLNonNull(OrganizationInput)
    },
    creatorId: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve
}

export default createStory
