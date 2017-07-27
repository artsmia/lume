import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} from 'graphql'
import bookType from './book'

const page = new GraphQLObjectType({
  name: "page",
  fields: ()=> ({
    id: {
      type: GraphQLString
    },
    title: {
      type: GraphQLString
    },
    text: {
      type: GraphQLString
    },
    index: {
      type: GraphQLInt
    },
    book: {
      type: bookType
    },
  })
})

export default page
