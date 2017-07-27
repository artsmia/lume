import {
  GraphQLString
} from 'graphql'
import itemType from '../types/item'
import itemEnumType from '../types/enums/itemType'
import itemModel from '../../db/models/item'

const editOrCreateItem = {
  type: itemType,
  args: {
    id: {
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
    galleryLocation: {
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
    // mainImageId: {
    //   type: GraphQLString
    // },
  },
  resolve: async (src, argItem) => {
    try {
      const {
        id,
        title,
        medium,
        artist,
        dated,
        accessionNumber,
        galleryLocation,
        creditLine,
        text,
        type,
        //mainImageId
      } = argItem

      let item

      if (id) {
        item = await itemModel.update({
          title,
          medium,
          artist,
          dated,
          accessionNumber,
          galleryLocation,
          creditLine,
          text,
          type,
        },{
          where: {
            id
          }
        })
        item = await itemModel.findById(id)
      } else {
        item = await itemModel.create({
          title,
          medium,
          artist,
          dated,
          accessionNumber,
          galleryLocation,
          creditLine,
          text,
          type,
        })
      }

      if (!item) {
        throw "some item error..."
      }

      return {
        ...item.dataValues
      }
    } catch (ex) {
      console.log("editOrCreateItem error", ex)
      return "editOrCreateItem error"
    }
  }
}

export default editOrCreateItem
