import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLBoolean
} from 'graphql'

import categoryType from './category'
import imageType from './image'

const group = new GraphQLObjectType({
  name: "group",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    title: {
      type: GraphQLString
    },
    slug: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    category: {
      type: categoryType
    },
    image: {
      type: imageType,
      async resolve(src){
        try {
          return await src.getImage()
        } catch (ex) {
          console.error(ex)
        }
      }
    },
  })
})

export default group
