import {
  GraphQLString
} from 'graphql'
import bookType from '../types/book'
import bookModel from '../../db/models/book'

const book = {
  type: bookType,
  args: {
    id: {
      type: GraphQLString
    },
  },
  resolve: async (src, {id}) => {
    try {

      const book = await bookModel.findById(id)

      return book
    } catch (ex) {
      console.log("Book error", ex)
      return "Book error"
    }
  }
}

export default book
