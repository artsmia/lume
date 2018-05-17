import {
  GraphQLList,
  GraphQLFloat,
  GraphQLObjectType,
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLString
} from 'graphql'

export const GeometryEnum = new GraphQLEnumType({
  name: 'GeometryEnum',
  values: {
    Point: {
      value: 'Point'
    },
    Polygon: {
      value: 'Polygon'
    },
    Linestring: {
      value: 'Linestring'
    },
    MultiPoint: {
      value: 'MultiPoint'
    },
    MultiLineString: {
      value: 'MultiLineString'
    },
    MultiPolygon: {
      value: 'MultiPolygon'
    },
    Feature: {
      value: 'Feature'
    },
    FeatureCollection: {
      value: 'FeatureCollection'
    }
  }
})

const coordinates = new GraphQLList(
  new GraphQLList(new GraphQLList(GraphQLFloat))
)

export const GeometryPropertiesInput = new GraphQLInputObjectType({
  name: 'GeometryPropertiesInput',
  fields: {
    name: {
      type: GraphQLString
    }
  }
})

export const GeometryInput = new GraphQLInputObjectType({
  name: 'GeometryInput',
  fields: {
    type: {
      type: GeometryEnum
    },
    coordinates: {
      type: coordinates
    }
  }
})

export const FeatureInput = new GraphQLInputObjectType({
  name: 'FeatureInput',
  fields: {
    type: {
      type: GeometryEnum
    },
    geometry: {
      type: GeometryInput
    },
    properties: {
      type: GeometryPropertiesInput
    }
  }
})

export const FeatureCollectionInput = new GraphQLInputObjectType({
  name: 'FeatureCollectionInput',
  fields: {
    type: {
      type: GeometryEnum
    },
    features: {
      type: new GraphQLList(FeatureInput)
    },
    properties: {
      type: GeometryPropertiesInput
    }
  }
})

const geometryProperties = new GraphQLObjectType({
  name: 'geometryProperties',
  fields: () => ({
    name: {
      type: GraphQLString
    }
  })
})

const geometry = new GraphQLObjectType({
  name: 'geometry',
  fields: () => ({
    type: {
      type: GeometryEnum
    },
    coordinates: {
      type: coordinates
    }
  })
})

const feature = new GraphQLObjectType({
  name: 'feature',
  fields: () => ({
    type: {
      type: GeometryEnum
    },
    geometry: {
      type: geometry
    },
    properties: {
      type: geometryProperties
    }
  })
})

const featureCollection = new GraphQLObjectType({
  name: 'featureCollection',
  fields: () => ({
    type: {
      type: GeometryEnum
    },
    properties: {
      type: geometryProperties
    },
    features: {
      type: new GraphQLList(feature)
    }
  })
})

export default featureCollection
