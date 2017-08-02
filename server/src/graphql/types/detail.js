import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} from 'graphql'
import itemType from './item'
import clipType from './clip'
import itemModel from '../../db/models/item'
import clipModel from '../../db/models/clip'


const detail = new GraphQLObjectType({
  name: "detail",
  fields: ()=> ({
    id: {
      type: GraphQLString
    },
    title: {
      type: GraphQLString
    },
    item: {
      type: itemType,
      resolve: async ({itemId}) => {
        try {
          const item = await itemModel.findById(itemId)
          return item
        } catch (ex) {
          console.log(ex)
        }
      }
    },
    clips: {
      type: new GraphQLList(clipType),
      resolve: async (detail) => {
        try {
          const clips = await clipModel.findAll({
            where: {
              detailId: detail.id
            }
          })
          return clips
        } catch (ex) {
          console.log(ex)

        }
      }
    }
  })
})

export default detail
