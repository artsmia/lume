import {
  GraphQLObjectType,
} from 'graphql'

import createContent from './createContent'

import createStory from './createStory'
import createOrganization from './createOrganization'
import editUserOrganizationRole from './editUserOrganizationRole'




const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createContent,
    createStory,
    createOrganization,
    editUserOrganizationRole
  }
})

export default mutation
