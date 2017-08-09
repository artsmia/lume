import {
  GraphQLObjectType,
} from 'graphql'
import allItems from './allItems'
import allGroups from './allGroups'
import allOrganizations from './allOrganizations'

import user from './user'
import item from './item'
import book from './book'


const query = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    allItems,
    allGroups,
    allOrganizations,
    item,
    book,
    user,
  }
})

export default query
