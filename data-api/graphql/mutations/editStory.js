import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} from 'graphql'
import {TemplateEnum, VisibilityEnum} from '../types/enums'
import storyType from '../types/story'
import resolve from '../resolvers/editStory'

const editStory = {
  name: "editStory",
  type: storyType,
  args: {
    id: {
      type: GraphQLID
    },
    title: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    previewImageId: {
      type: GraphQLID
    },
    template: {
      type: TemplateEnum,
    },
    visibility: {
      type: VisibilityEnum
    }
  },
  resolve
}

export default editStory
