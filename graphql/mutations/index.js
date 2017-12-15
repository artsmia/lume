import {
  GraphQLObjectType,
} from 'graphql'

import createContent from './createContent'

import createStory from './createStory'
import createOrganization from './createOrganization'
import editUserOrganizationRole from './editUserOrganizationRole'
import reorderContents from './reorderContents'




const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createContent,
    createStory,
    createOrganization,
    editUserOrganizationRole,
    reorderContents
  }
})

export default mutation
