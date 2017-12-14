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
