import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} from 'graphql'
import objType from '../types/obj'
import resolve from '../resolvers/obj'

const obj = {
  name: 'obj',
  type: objType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve
}

export default obj
