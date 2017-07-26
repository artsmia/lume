import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql'

const user = new GraphQLObjectType({
  name: "user",
  fields: {
    email: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString
    },
    token: {
      type: GraphQLString
    },
  }
})

export default user
