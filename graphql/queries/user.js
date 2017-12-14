import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString
} from 'graphql'
import userType from '../types/user'
import resolve from '../resolvers/user'

const user = {
  name: "user",
  type: userType,
  args: {
    id: {
      type: GraphQLID
    },
  },
  resolve
}

export default user
