import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} from 'graphql'
import imageType from '../types/image'
import resolve from '../resolvers/image'

const image = {
  name: "image",
  type: imageType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
  },
  resolve
}

export default image
