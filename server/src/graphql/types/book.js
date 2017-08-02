import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} from 'graphql'
import pageType from './page'
import itemType from './item'
import pageModel from '../../db/models/page'

const book = new GraphQLObjectType({
  name: "book",
  fields: ()=> ({
    id: {
      type: GraphQLString
    },
    title: {
      type: GraphQLString
    },
    pages: {
      type: new GraphQLList(pageType),
      resolve: async (book) => {
        try {
          const pages = await pageModel.findAll({
            where: {
              bookId: book.id
            }
          })
          return pages
        } catch (ex) {
          console.log(ex)

        }
      }
    },
    relatedItems: {
      type: new GraphQLList(itemType)
    },
  })
})

export default book
