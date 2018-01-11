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
    obj: {
      value: "obj"
    },
    movie: {
      value: "movie"
    },
    picture: {
      value: "picture"
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

export const TemplateEnum = new GraphQLEnumType({
  name: 'TemplateEnum',
  values: {
    scroller: {
      value: "scroller"
    },
    slider: {
      value: "slider"
    },
    original: {
      value: "original"
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

export const MediaEnum = new GraphQLEnumType({
  name: 'MediaEnum',
  values: {
    image: {
      value: "image"
    },
    video: {
      value: "video"
    },
  }
})
