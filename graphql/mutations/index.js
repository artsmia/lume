import {
  GraphQLObjectType,
} from 'graphql'

import createStory from './createStory'
import createOrganization from './createOrganization'
import editUserOrganizationRole from './editUserOrganizationRole'




const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createStory,
    createOrganization,
    editUserOrganizationRole
  }
})

export default mutation
