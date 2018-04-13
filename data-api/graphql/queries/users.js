import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList
} from 'graphql'
import userType from '../types/user'
import {FilterInput} from '../types/inputs'
import resolve from '../resolvers/users'

const users = {
  name: "users",
  type: new GraphQLList(userType),
  args: {
    filter: {
      type: FilterInput
    },
  },
  resolve
}

export default users
