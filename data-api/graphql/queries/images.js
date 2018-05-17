import { GraphQLObjectType, GraphQLID, GraphQLList } from 'graphql'
import imageType from '../types/image'
import { FilterInput } from '../types/inputs'
import resolve from '../resolvers/images'

const images = {
  name: 'images',
  type: new GraphQLList(imageType),
  args: {
    filter: {
      type: FilterInput
    }
  },
  resolve
}

export default images
