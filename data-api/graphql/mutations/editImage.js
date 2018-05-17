import { GraphQLID, GraphQLString, GraphQLNonNull, GraphQLList } from 'graphql'
import imageType from '../types/image'
import resolve from '../resolvers/editImage'

const editImage = {
  name: 'editImage',
  type: imageType,
  args: {
    id: {
      type: GraphQLID
    },
    title: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    }
  },
  resolve
}

export default editImage
