import {
  GraphQLObjectType,
} from 'graphql'
import createUser from './createUser'
import loginUser from './loginUser'
import editOrCreateItem from './editOrCreateItem'


const mutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: {
    createUser,
    loginUser,
    editOrCreateItem
  }
})

export default mutation
