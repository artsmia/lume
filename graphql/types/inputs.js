import {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLID,
  GraphQLString,
  GraphQLList
} from 'graphql'
import {DirectionEnum} from './enums'

const OrderInput = new GraphQLInputObjectType({
  name: 'OrderInput',
  fields: {
    direction: {
      type: DirectionEnum
    },
    column: {
      type: GraphQLString
    },
  }
})

export const FilterInput = new GraphQLInputObjectType({
  name: 'FilterInput',
  fields: {
    limit: {
      type: GraphQLInt
    },
    order: {
      type: new GraphQLList(OrderInput)
    },
    offset: {
      type: GraphQLInt
    },
    organizationId: {
      type: GraphQLID
    },
    subdomain: {
      type: GraphQLString
    },
    search: {
      type: GraphQLString
    },

  }
})

export const OrganizationInput = new GraphQLInputObjectType({
  name: 'OrganizationInput',
  fields: {
    id: {
      type: GraphQLID
    },
    subdomain: {
      type: GraphQLString
    },
  }
})
