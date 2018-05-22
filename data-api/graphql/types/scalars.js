import { GraphQLScalarType, GraphQLObjectType, GraphQLEnumType } from 'graphql'

export const DateScalar = new GraphQLScalarType({
  name: 'Date',
  serialize: value => {
    console.log('serialize', value)
    return value
  },
  parseValue: value => {
    console.log('parseValue', value)
    return value
  },
  parseLiteral: value => {
    console.log('parseLiteral', value)
    return value
  }
})

export const DateThing = {
  name: 'Date Type',
  type: DateScalar,
  args: {
    format: {
      type: new GraphQLEnumType({
        name: 'DateFormatEnum',
        values: {
          UTC: {
            value: 'UTC'
          },
          ISO: {
            value: 'ISO'
          },
          STRING: {
            value: 'STRING'
          }
        }
      })
    }
  },
  resolve: async (src, { format }) => {
    let date = new Date(Date.parse(src.updatedAt))

    if (format === 'ISO') {
      return date.toISOString()
    } else if (format === 'STRING') {
      return date.toLocaleDateString()
    } else {
      return date.valueOf()
    }
  }
}

//
// export const DateField = new GraphQLObjectType({
//   name: 'Date',
//   type: DateScalar,
//   args: {
//     format: {
//       type: new GraphQLEnumType({
//
//       })
//     }
//   },
//   resolve: async(src, {format})=>{
//     try {
//
//
//
//
//     } catch (ex) {
//       console.error(ex)
//     }
//   }
// })
