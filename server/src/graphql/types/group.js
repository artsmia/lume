import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql'

const group = new GraphQLObjectType({
  name: "group",
  fields: {
    title: {
      type: GraphQLString
    },
    type: {
      type: GraphQLString
    },
    // items: {
    //   type:
    // }
  }
})

export default group
