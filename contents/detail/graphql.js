import {
  GraphQLString,
  GraphQLID
} from 'graphql'
import imageType from '../../graphql/types/image'

export const fields = {
  title: {
    type: GraphQLString
  },
  description: {
    type: GraphQLString
  },
  image0: {
    type: imageType
  },
}

export const args = {
  title: {
    type: GraphQLString
  },
  description: {
    type: GraphQLString
  },
  image0Id: {
    type: GraphQLID
  },
}
