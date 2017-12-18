import {
  GraphQLObjectType,
} from 'graphql'

import createContent from './createContent'
import createImage from './createImage'

import createStory from './createStory'
import createOrganization from './createOrganization'
import editContent from './editContent'
import editStory from './editStory'
import editUserOrganizationRole from './editUserOrganizationRole'
import reorderContents from './reorderContents'




const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createContent,
    createImage,
    createStory,
    createOrganization,
    editContent,
    editStory,
    editUserOrganizationRole,
    reorderContents
  }
})

export default mutation
