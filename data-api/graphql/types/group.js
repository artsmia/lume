import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLBoolean
} from 'graphql'

import categoryType from './category'

const group = new GraphQLObjectType({
  name: "group",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    title: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    category: {
      type: categoryType
    },
  })
})

export default group
