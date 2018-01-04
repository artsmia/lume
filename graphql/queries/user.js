import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} from 'graphql'
import userType from '../types/user'
import resolve from '../resolvers/user'

const user = {
  name: "user",
  type: userType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
  },
  resolve
}

export default user
