import {
  GraphQLList,
  GraphQLFloat,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean
} from 'graphql'

import imageType from './image'
import {MediaEnum} from './enums'


const obj = new GraphQLObjectType({
  name: "obj",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    localId: {
      type: GraphQLString
    },
    title: {
      type: GraphQLString
    },
    attribution: {
      type: GraphQLString
    },
    date: {
      type: GraphQLString
    },
    culture: {
      type: GraphQLString
    },
    accessionNumber: {
      type: GraphQLString
    },
    medium: {
      type: GraphQLString
    },
    dimensions: {
      type: GraphQLString
    },
    currentLocation: {
      type: GraphQLString
    },
    creditLine: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    pullFromCustomApi: {
      type: GraphQLBoolean
    },
    primaryImage: {
      type: imageType,
      async resolve(src){
        try {
          return await src.getPrimaryImage()
        } catch (ex) {
          console.error(ex)
        }
      }
    },
    primaryMediaType: {
      type: MediaEnum
    }
  })
})

export default obj
