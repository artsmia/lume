import {
  GraphQLEnumType,
} from 'graphql'

const orderByType = new GraphQLEnumType({
  name: 'itemType',
  values: {
    DEFAULT: {
      value: 'DEFAULT'
    },
    MIA: {
      value: 'MIA'
    },
  }
})

export default orderByType
