import { GraphQLID, GraphQLString, GraphQLNonNull } from 'graphql'
import authentication from '../types/authentication'
import resolve from '../resolvers/authenticate'

const authenticate = {
  name: 'user',
  type: authentication,
  args: {},
  resolve
}

export default authenticate
