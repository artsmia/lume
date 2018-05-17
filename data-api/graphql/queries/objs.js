import { GraphQLObjectType, GraphQLID, GraphQLList } from 'graphql'
import objType from '../types/obj'
import { FilterInput } from '../types/inputs'
import resolve from '../resolvers/objs'

const objs = {
  name: 'objs',
  type: new GraphQLList(objType),
  args: {
    filter: {
      type: FilterInput
    }
  },
  resolve
}

export default objs
