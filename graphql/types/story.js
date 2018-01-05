import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} from 'graphql'
import organizationType from './organization'
import imageType from './image'
import contentType from './content'
import {VisibilityEnum, TemplateEnum} from './enums'

import {organizationResolver} from '../resolvers/story'

const story = new GraphQLObjectType({
  name: "story",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    title: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    visibility: {
      type: VisibilityEnum
    },
    template: {
      type: TemplateEnum
    },
    organization: {
      type: organizationType,
      resolve: organizationResolver
    },
    updatedAt: {
      type: GraphQLString
    },
    previewImage: {
      type: imageType,
      async resolve(src){
        try {
          return await src.getPreviewImage()
        } catch (ex) {
          console.error(ex)
        }
      }
    },
    contents: {
      type: new GraphQLList(contentType),
      async resolve(src){
        try {
          return await src.getContents({
            order: [
              ["index", "asc"]
            ]
          })
        } catch (ex) {
          console.error(ex)
        }
      }
    },
  })
})

export default story
