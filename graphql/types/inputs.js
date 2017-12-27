import {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLFloat
} from 'graphql'
import {DirectionEnum} from './enums'
import {GeometryEnum, GeometryInput} from './geometry'
import {args} from '../../contents/graphql'


export const OrderInput = new GraphQLInputObjectType({
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


const coordinatesInput = new GraphQLList( new GraphQLList( new GraphQLList(GraphQLFloat)))


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
    organization: {
      type: OrganizationInput
    },
    subdomain: {
      type: GraphQLString
    },
    search: {
      type: GraphQLString
    },

  }
})

export const ContentInput = new GraphQLInputObjectType({
  name: 'ContentInput',
  fields: {
    ...args
  }
})
