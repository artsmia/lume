import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql'
import detailType from './detail'

const clip = new GraphQLObjectType({
  name: "clip",
  fields: ()=> ({
    id: {
      type: GraphQLString
    },
    title: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    coordinates: {
      type: GraphQLString
    },
    detail: {
      type: detailType
    },
  })
})

export default clip
