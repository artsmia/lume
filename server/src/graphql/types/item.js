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
      resolve: async (item) => {
        try {
          const detail = await detailModel.findOne({
            where: {
              itemId: item.id
            },
          })

          return detail
        } catch (ex) {

        }
      }
    },
    relatedBooks: {
      type: new GraphQLList(bookType)
    },
  })
})


export default item
