import {
  GraphQLObjectType,
} from 'graphql'
import allUsers from './allUsers'

const query = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    allUsers
  }
})

export default query
