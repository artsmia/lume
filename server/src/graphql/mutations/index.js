import {
  GraphQLObjectType,
} from 'graphql'
import editOrCreateItem from './editOrCreateItem'
import editOrCreateGroup from './editOrCreateGroup'
import editOrCreateOrganization from './editOrCreateOrganization'
import addUserToOrganization from './addUserToOrganization'

const mutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: {
    editOrCreateItem,
    editOrCreateGroup,
    editOrCreateOrganization,
    addUserToOrganization
  }
})

export default mutation
