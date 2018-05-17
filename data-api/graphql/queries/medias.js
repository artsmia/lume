import { GraphQLObjectType, GraphQLID, GraphQLList } from 'graphql'
import mediaType from '../types/media'
import { FilterInput } from '../types/inputs'
import resolve from '../resolvers/medias'

const medias = {
  name: 'medias',
  type: new GraphQLList(mediaType),
  args: {
    filter: {
      type: FilterInput
    }
  },
  resolve
}

export default medias
