import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql'
import imageType from '../types/story'
import resolve from '../resolvers/createImage'
import { OrganizationInput } from '../types/inputs'

const createImage = {
  name: 'createImage',
  type: imageType,
  args: {
    id: {
      type: GraphQLID
    },
    organization: {
      type: OrganizationInput
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

export default createImage
