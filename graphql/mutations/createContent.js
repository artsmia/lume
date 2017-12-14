import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} from 'graphql'
import contentType from '../types/content'
import {ContentTypeEnum} from '../types/enums'

import resolve from '../resolvers/createContent'

const createContent = {
  name: "createContent",
  type: contentType,
  args: {
    storyId: {
      type: new GraphQLNonNull(GraphQLID)
    },
    type: {
      type: new GraphQLNonNull(ContentTypeEnum)
    }
  },
  resolve
}

export default createContent
