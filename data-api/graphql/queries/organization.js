import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} from 'graphql'
import organizationType from '../types/organization'
import resolve from '../resolvers/organization'
import { OrganizationInput } from '../types/inputs'

const organization = {
  name: 'organization',
  type: organizationType,
  args: {
    organization: {
      type: new GraphQLNonNull(OrganizationInput)
    }
  },
  resolve
}

export default organization
