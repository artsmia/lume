import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} from 'graphql'
import organizationType from './organization'

const user = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    email: {
      type: GraphQLString
    },
    organizations: {
      type: new GraphQLList(organizationType),
    },
  })
})

export default user
