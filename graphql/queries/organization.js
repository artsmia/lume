import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
} from 'graphql'
import organizationType from '../types/organization'
import resolve from '../resolvers/organization'

const organization = {
  name: "organization",
  type: organizationType,
  args: {
    id: {
      type: GraphQLID
    },
    subdomain: {
      type: GraphQLString
    }
  },
  resolve
}

export default organization
