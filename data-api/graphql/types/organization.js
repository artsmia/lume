import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLBoolean
} from 'graphql'
import imageType from './image'
import {RoleEnum} from './enums'

import categoryType from './category'

const organization = new GraphQLObjectType({
  name: "organization",
  fields: () => ({
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
    images: {
      type: new GraphQLList(imageType)
    },
    role: {
      type: RoleEnum,
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
    categories: {
      type: new GraphQLList(categoryType)
    }
  })
})

export default organization
