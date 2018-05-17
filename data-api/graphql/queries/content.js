import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql'
import contentType from '../types/content'
import resolve from '../resolvers/content'

const content = {
  name: 'content',
  type: contentType,
  args: {
    id: {
      type: GraphQLID
    }
  },
  resolve
}

export default content
