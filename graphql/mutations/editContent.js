import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} from 'graphql'
import contentType, {fields} from '../types/content'
import {ContentTypeEnum} from '../types/enums'

import resolve from '../resolvers/editContent'

const editContent = {
  name: "editContent",
  type: contentType,
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
    image0Id: {
      type: GraphQLID
    },
    type: {
      type: ContentTypeEnum
    },
  },
  resolve
}

export default editContent
