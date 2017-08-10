import {
  GraphQLObjectType,
} from 'graphql'
import allItems from './allItems'
import allGroups from './allGroups'
import allOrganizations from './allOrganizations'

import user from './user'
import item from './item'
import book from './book'
import organization from './organization'


const query = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    allItems,
    allGroups,
    allOrganizations,
    item,
    book,
    user,
    organization
  }
})

export default query
