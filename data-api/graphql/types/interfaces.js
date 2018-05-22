import {
  GraphQLInterfaceType,
  GraphQLID,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'

export const CoreInterface = new GraphQLInterfaceType({
  name: 'Core',
  fields: {
    id: {
      type: GraphQLID
    }
  },
  resolveType: () =>
    new GraphQLObjectType({
      name: 'Core'
    })
})

export const ContentInterface = new GraphQLInterfaceType({
  name: 'Core',
  fields: {
    id: {
      type: GraphQLID
    },
    title: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    }
  },
  resolveType: () =>
    new GraphQLObjectType({
      name: 'Core'
    })
})
