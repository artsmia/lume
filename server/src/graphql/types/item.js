import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} from 'graphql'
import itemEnumType from './enums/itemType'
import imageType from './image'
import detailType from './detail'
import bookType from './book'
import detailModel from '../../db/models/detail'
import bookModel from '../../db/models/book'
import itemModel from '../../db/models/item'


const item = new GraphQLObjectType({
  name: "item",
  fields: () => ({
    id: {
      type: GraphQLString
    },
    miaId: {
      type: GraphQLString
    },
    title: {
      type: GraphQLString
    },
    medium: {
      type: GraphQLString
    },
    artist: {
      type: GraphQLString
    },
    dated: {
      type: GraphQLString
    },
    accessionNumber: {
      type: GraphQLString
    },
    currentLocation: {
      type: GraphQLString
    },
    creditLine: {
      type: GraphQLString
    },
    text: {
      type: GraphQLString
    },
    type: {
      type: itemEnumType
    },
    mainImage: {
      type: imageType
    },
    relatedItems: {
      type: new GraphQLList(item)
    },
    detail: {
      type: detailType,
      resolve: async (obj) => {
        try {
          const detail = await detailModel.findOne({
            where: {
              itemId: obj.id
            },
          })

          return detail
        } catch (ex) {
          console.log("detail ex", ex)

        }
      }
    },
    relatedBooks: {
      type: new GraphQLList(bookType),
      resolve: async (item) => {
        try {

          const itemInst = await itemModel.findById(item.id)

          const relatedBooks = await itemInst.getRelatedBooks()

          return relatedBooks
        } catch (ex) {
          console.log("relatedBooks ex", ex)
        }
      }
    },
  })
})


export default item
