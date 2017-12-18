import {GraphQLEnumType} from 'graphql'
import contentTypes from '../../contents/types'

let values = {}
contentTypes.forEach( type => Object.assign(values, {
  [type]: {
    value: type
  }
}))

export const ContentTypeEnum = new GraphQLEnumType({
  name: 'ContentTypeEnum',
  values
})

export const DirectionEnum = new GraphQLEnumType({
  name: 'DirectionEnum',
  values: {
    ASC: {
      value: "ASC"
    },
    DESC: {
      value: "DESC"
    },
  }
})

export const RoleEnum = new GraphQLEnumType({
  name: 'RoleEnum',
  values: {
    admin: {
      value: "admin"
    },
    contributor: {
      value: "contributor"
    },
  }
})

export const TemplateEnum = new GraphQLEnumType({
  name: 'TemplateEnum',
  values: {
    scroller: {
      value: "scroller"
    },
    slider: {
      value: "slider"
    },
  }
})


export const VisibilityEnum = new GraphQLEnumType({
  name: 'VisibilityEnum',
  values: {
    published: {
      value: "published"
    },
    draft: {
      value: "draft"
    },
  }
})
