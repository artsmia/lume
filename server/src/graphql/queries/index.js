import {
  GraphQLObjectType,
} from 'graphql'
import allUsers from './allUsers'
import allItems from './allItems'
import item from './item'


const query = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    allUsers,
    allItems,
    item
  }
})

export default query
