import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull
} from 'graphql'
import {ContentTypeEnum} from '../graphql/types/enums'
import imageType from '../graphql/types/image'
import objType from '../graphql/types/obj'
import geometryType, {GeometryInput} from '../graphql/types/geometry'
import objResolve from '../graphql/resolvers/obj'

export const contentType = new GraphQLObjectType({
  name: "content",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    type: {
      type: ContentTypeEnum
    },
    index: {
      type: GraphQLInt
    },
    title: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    image0: {
      type: imageType,
      async resolve(src){
        try {
          return await src.getImage0()
        } catch (ex) {
          console.error(ex)
        }
      }
    },
    image1: {
      type: imageType,
      async resolve(src){
        try {
          return await src.getImage1()
        } catch (ex) {
          console.error(ex)
        }
      }
    },
    videoUrl: {
      type: GraphQLString
    },
    geometry: {
      type: geometryType
    },
    obj: {
      type: objType,
      resolve: objResolve,
    }
  })
})


export const args = {
  id: {
    type: GraphQLID
  },
  type: {
    type: ContentTypeEnum
  },
  title: {
    type: GraphQLString
  },
  description: {
    type: GraphQLString
  },
  image0Id: {
    type: GraphQLID
  },
  image1Id: {
    type: GraphQLID
  },
  videoUrl: {
    type: GraphQLString
  },
  geometry: {
    type: GeometryInput
  },
  objId: {
    type: GraphQLID
  },
}
