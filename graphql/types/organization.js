import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLBoolean
} from 'graphql'
import imageType from './image'
import {RoleEnum} from './enums'


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
      type: RoleEnum
    },
    customImageApiEnabled: {
      type: GraphQLBoolean
    },
    customImageEndpoint: {
      type: GraphQLString
    },
  })
})

export default organization
