import {
  GraphQLObjectType,
} from 'graphql'
import createCategory from './createCategory'

import createContent from './createContent'
import createGroup from './createGroup'
import createImage from './createImage'
import createObj from './createObj'
import createStory from './createStory'
import createOrganization from './createOrganization'

import deleteCategory from './deleteCategory'
import deleteContent from './deleteContent'
import deleteGroup from './deleteGroup'
import deleteStory from './deleteStory'

import editContent from './editContent'
import editObj from './editObj'
import editOrganization from './editOrganization'
import editCategory from './editCategory'
import editGroup from './editGroup'

import editStory from './editStory'
import editUserOrganizationRole from './editUserOrganizationRole'
import reorderContents from './reorderContents'




const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createCategory,
    createContent,
    createGroup,
    createObj,
    createImage,
    createStory,
    createOrganization,
    deleteCategory,
    deleteContent,
    deleteGroup,
    deleteStory,
    editCategory,
    editContent,
    editGroup,
    editStory,
    editObj,
    editUserOrganizationRole,
    editOrganization,
    reorderContents
  }
})

export default mutation
