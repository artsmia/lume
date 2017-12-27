import {
  GraphQLList,
  GraphQLFloat,
  GraphQLObjectType,
  GraphQLEnumType,
  GraphQLInputObjectType
} from 'graphql'

export const GeometryEnum = new GraphQLEnumType({
  name: 'GeometryEnum',
  values: {
    Point: {
      value: "Point"
    },
    Polygon: {
      value: "Polygon"
    },
    Linestring: {
      value: "Linestring"
    },
  }
})

export const GeometryInput = new GraphQLInputObjectType({
  name: 'GeometryInput',
  fields: {
    type: {
      type: GeometryEnum
    },
    coordinates: {
      type: new GraphQLList( new GraphQLList( new GraphQLList(GraphQLFloat)))
    },
  }
})

const geometry = new GraphQLObjectType({
  name: "geometry",
  fields: () => ({
    type: {
      type: GeometryEnum
    },
    coordinates: {
      type: new GraphQLList(new GraphQLList(new GraphQLList(GraphQLFloat)))
    }
  })
})

export default geometry
