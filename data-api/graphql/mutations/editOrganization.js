import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLBoolean
} from 'graphql'
import organizationType from '../types/organization'
import resolve from '../resolvers/editOrganization'

const editOrganization = {
  name: "editOrganization",
  type: organizationType,
  args: {
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    subdomain: {
      type: GraphQLString
    },
    emailDomain: {
      type: GraphQLString
    },
    customImageApiEnabled: {
      type: GraphQLBoolean
    },
    customImageEndpoint: {
      type: GraphQLString
    },
    customObjApiEnabled: {
      type: GraphQLBoolean
    },
    customObjApiEndpoint: {
      type: GraphQLString
    },
    newUsersRequireApproval: {
      type: GraphQLBoolean
    },
    customAnalyticsEnabled: {
      type: GraphQLBoolean
    },
    customAnalyticsId: {
      type: GraphQLString
    },
    orgImageId: {
      type: GraphQLID
    }
  },
  resolve
}

export default editOrganization
