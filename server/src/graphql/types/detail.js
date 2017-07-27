import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql'
import itemType from './item'

const detail = new GraphQLObjectType({
  name: "detail",
  fields: ()=> ({
    id: {
      type: GraphQLString
    },
    title: {
      type: GraphQLString
    },
    item: {
      type: itemType
    }
  })
})

export default detail
