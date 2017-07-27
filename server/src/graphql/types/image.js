import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql'

const image = new GraphQLObjectType({
  name: "image",
  fields: ()=> ({
    id: {
      type: GraphQLString
    },
    url: {
      type: GraphQLString
    },
  })
})

export default image
