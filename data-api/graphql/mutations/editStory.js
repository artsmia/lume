import { GraphQLID, GraphQLString, GraphQLNonNull, GraphQLList } from 'graphql'
import { TemplateEnum, VisibilityEnum } from '../types/enums'
import storyType from '../types/story'
import resolve from '../resolvers/editStory'

const editStory = {
  name: 'editStory',
  type: storyType,
  args: {
    id: {
      type: GraphQLID
    },
    title: {
      type: GraphQLString
    },
    slug: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    previewImageId: {
      type: GraphQLID
    },
    template: {
      type: TemplateEnum
    },
    visibility: {
      type: VisibilityEnum
    },
    addRelatedStoryId: {
      type: GraphQLID
    },
    removeRelatedStoryId: {
      type: GraphQLID
    },
    setGroupsIds: {
      type: new GraphQLList(GraphQLID)
    }
  },
  resolve
}

export default editStory
