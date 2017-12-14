import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} from 'graphql'
import organizationType from './organization'
import imageType from './image'
import contentType from './content'

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
    organization: {
      type: organizationType,
      resolve: organizationResolver
    },
    updatedAt: {
      type: GraphQLString
    },
    previewImage: {
      type: imageType
    },
    contents: {
      type: new GraphQLList(contentType),
      async resolve(src){
        try {

          console.log(src)
          return await src.getContents()
        } catch (ex) {
          console.error(ex)
        }
      }
    },
  })
})

export default story
