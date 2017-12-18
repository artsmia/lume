import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} from 'graphql'
import contentType, {fields} from '../types/content'
import {ContentTypeEnum} from '../types/enums'
import { ContentInput } from '../types/inputs'
import resolve from '../resolvers/editContent'

const editContent = {
  name: "editContent",
  type: contentType,
  args: {
    content: {
      type: new GraphQLNonNull(ContentInput)
    }
  },
  resolve
}

export default editContent
