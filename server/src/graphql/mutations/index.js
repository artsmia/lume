import {
  GraphQLObjectType,
} from 'graphql'
import createUser from './createUser'
import loginUser from './loginUser'


const mutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: {
    createUser,
    loginUser
  }
})

export default mutation
