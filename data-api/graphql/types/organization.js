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
    orgImage: {
      type: imageType,
      async resolve(src){
        try {
          return await src.getOrgImage()
        } catch (ex) {
          console.error(ex)
        }
      }
    },
    locationEnabled: {
      type: GraphQLBoolean
    },
    locationImage: {
      type: imageType,
      async resolve(src){
        try {
          return await src.getLocationImage()
        } catch (ex) {
          console.error(ex)
        }
      }
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
    objSearchEndpoint: {
      type: GraphQLString
    },
    imageSearchEndpoint: {
      type: GraphQLString
    },
    customAnalyticsEnabled: {
      type: GraphQLBoolean
    },
    customAnalyticsId: {
      type: GraphQLString
    },
    newUsersRequireApproval: {
      type: GraphQLBoolean
    },
    categories: {
      type: new GraphQLList(categoryType),
      async resolve(src){
        try {
          return await src.getCategories()
        } catch (ex) {
          console.error(ex)
        }
      }
    }
  })
})

export default organization
