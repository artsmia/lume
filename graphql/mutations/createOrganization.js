import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} from 'graphql'
import storyType from '../types/story'
import resolve from '../resolvers/createOrganization'

const createOrganization = {
  name: "createOrganization",
  type: storyType,
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    subdomain: {
      type: new GraphQLNonNull(GraphQLString)
    },
    creatorId: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve
}

export default createOrganization
