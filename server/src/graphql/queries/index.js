import {
  GraphQLObjectType,
} from 'graphql'
import allUsers from './allUsers'
import allItems from './allItems'
import allGroups from './allGroups'

import item from './item'
import book from './book'


const query = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    allUsers,
    allItems,
    allGroups,
    item,
    book
  }
})

export default query
