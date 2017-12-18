import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} from 'graphql'
import contentType, {fields} from '../types/content'
import {ContentTypeEnum} from '../types/enums'
import { args} from '../../contents/graphql'
import resolve from '../resolvers/editContent'

const editContent = {
  name: "editContent",
  type: contentType,
  args,
  resolve
}

export default editContent
