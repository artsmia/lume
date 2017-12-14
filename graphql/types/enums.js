import {GraphQLEnumType} from 'graphql'

export const ContentTypeEnum = new GraphQLEnumType({
  name: 'ContentTypeEnum',
  values: {
    comparison: {
      value: "comparison"
    },
    detail: {
      value: "detail"
    },
    picture: {
      value: "picture"
    },
    movie: {
      value: "movie"
    },
    obj: {
      value: "obj"
    },
  }
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
