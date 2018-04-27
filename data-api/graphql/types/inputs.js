import {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLNonNull,
} from 'graphql'
import {DirectionEnum, ContentTypeEnum, TemplateEnum, VisibilityEnum} from './enums'
import {GeometryEnum, GeometryInput} from './geometry'


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


export const ObjInput = new GraphQLInputObjectType({
  name: 'ObjInput',
  fields: {
    id: {
      type: GraphQLID
    },
    localId: {
      type: GraphQLString
    },
    title: {
      type: GraphQLString
    },
    attribution: {
      type: GraphQLString
    },
    date: {
      type: GraphQLString
    },
    culture: {
      type: GraphQLString
    },
    accessionNumber: {
      type: GraphQLString
    },
    medium: {
      type: GraphQLString
    },
    dimensions: {
      type: GraphQLString
    },
    currentLocation: {
      type: GraphQLString
    },
    creditLine: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    pullFromCustomApi: {
      type: GraphQLBoolean
    },
    primaryImageId: {
      type: GraphQLID
    }
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
    template: {
      type: new GraphQLList(TemplateEnum)
    },
    visibility: {
      type: new GraphQLList(VisibilityEnum)
    },
    groups: {
      type: new GraphQLList(GraphQLID)
    },
    localId: {
      type: GraphQLString
    },
    groupSlug: {
      type: GraphQLString
    },
  }
})

export const ContentInput = new GraphQLInputObjectType({
  name: 'ContentInput',
  fields: {
    id: {
      type: GraphQLID
    },
    type: {
      type: ContentTypeEnum
    },
    title: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    image0Id: {
      type: GraphQLID
    },
    image1Id: {
      type: GraphQLID
    },
    videoUrl: {
      type: GraphQLString
    },
    geometry: {
      type: GeometryInput
    },
    objId: {
      type: GraphQLID
    },
    addAdditionalImageId: {
      type: GraphQLID
    },
    removeAdditionalImageId: {
      type: GraphQLID
    },
    addAdditionalMediaId: {
      type: GraphQLID
    },
    removeAdditionalMediaId: {
      type: GraphQLID
    }
  }
})

export const StorySlugInput = new GraphQLInputObjectType({
  name: 'StorySlugInput',
  fields: {
    slug: {
      type: new GraphQLNonNull(GraphQLString)
    },
    organization: {
      type: new GraphQLNonNull(OrganizationInput)
    },
  }
})
