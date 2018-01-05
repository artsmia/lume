import {
  GraphQLObjectType,
} from 'graphql'

import createContent from './createContent'
import createImage from './createImage'
import createObj from './createObj'
import createStory from './createStory'
import createOrganization from './createOrganization'
import editContent from './editContent'
import editObj from './editObj'
import editStory from './editStory'
import editUserOrganizationRole from './editUserOrganizationRole'
import reorderContents from './reorderContents'




const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createContent,
    createObj,
    createImage,
    createStory,
    createOrganization,
    editContent,
    editStory,
    editObj,
    editUserOrganizationRole,
    reorderContents
  }
})

export default mutation
