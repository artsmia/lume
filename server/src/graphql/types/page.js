import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} from 'graphql'
import bookType from './book'
import bookModel from '../../db/models/book'

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
      type: bookType,
      resolve: async ({bookId}) => {
        try {
          return await bookModel.findById(bookId)
        } catch (ex) {
          console.log(ex)
        }
      }
    },
  })
})

export default page
