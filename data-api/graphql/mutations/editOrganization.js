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
    locationEnabled: {
      type: GraphQLBoolean
    },
    customImageApiEnabled: {
      type: GraphQLBoolean
    },
    customImageEndpoint: {
      type: GraphQLString
    },
    imageSearchEndpoint: {
      type: GraphQLString
    },
    customObjApiEnabled: {
      type: GraphQLBoolean
    },
    customObjApiEndpoint: {
      type: GraphQLString
    },
    objSearchEndpoint: {
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
    },
    locationImageId: {
      type: GraphQLID
    }
  },
  resolve
}

export default editOrganization
