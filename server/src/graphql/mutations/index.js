import {
  GraphQLObjectType,
} from 'graphql'
import createUser from './createUser'
import loginUser from './loginUser'
import editOrCreateItem from './editOrCreateItem'
import editOrCreateGroup from './editOrCreateGroup'


const mutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: {
    createUser,
    loginUser,
    editOrCreateItem,
    editOrCreateGroup
  }
})

export default mutation
