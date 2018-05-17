import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} from 'graphql'
import userType from './user'
import organizationType from './organization'
import { RoleEnum } from './enums'

const permissionsType = new GraphQLObjectType({
  name: 'permissions',
  fields: () => ({
    organization: {
      type: organizationType
    },
    role: {
      type: RoleEnum
    }
  })
})

const authentication = new GraphQLObjectType({
  name: 'authentication',
  fields: () => ({
    user: {
      type: userType
    },
    timestamp: {
      type: GraphQLString
    },
    permissions: {
      type: new GraphQLList(permissionsType)
    }
  })
})

export default authentication
