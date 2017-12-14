import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} from 'graphql'
import organizationType from './organization'
import {organizationsResolve} from '../resolvers/user'

const user = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    email: {
      type: GraphQLString
    },
    subdomain: {
      type: GraphQLString
    },
    emailDomain: {
      type: GraphQLString
    },
    organizations: {
      type: new GraphQLList(organizationType),
      resolve: organizationsResolve
    },
  })
})

export default user
