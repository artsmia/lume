import { GraphQLID, GraphQLString, GraphQLNonNull } from 'graphql'
import organizationType from '../types/organization'
import resolve from '../resolvers/createOrganization'

const createOrganization = {
  name: 'createOrganization',
  type: organizationType,
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
