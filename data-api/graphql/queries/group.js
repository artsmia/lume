import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql'
import groupType from '../types/group'
import resolve from '../resolvers/group'

const group = {
  name: 'group',
  type: groupType,
  args: {
    id: {
      type: GraphQLID
    }
  },
  resolve
}

export default group
