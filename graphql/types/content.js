import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt
} from 'graphql'
import {ContentTypeEnum} from './enums'
import imageType from './image'


const content = new GraphQLObjectType({
  name: "content",
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
    image0: {
      type: imageType
    },
    type: {
      type: ContentTypeEnum
    },
    index: {
      type: GraphQLInt
    },
  })
})

export default content
