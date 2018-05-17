import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLBoolean
} from 'graphql'

import imageType from './image'
import groupType from './group'
import organizationType from './organization'

const category = new GraphQLObjectType({
  name: 'category',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    title: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    image: {
      type: imageType,
      async resolve(src) {
        try {
          return await src.getImage()
        } catch (ex) {
          console.error(ex)
        }
      }
    },
    groups: {
      type: new GraphQLList(groupType),
      async resolve(src) {
        try {
          return await src.getGroups()
        } catch (ex) {
          console.error(ex)
        }
      }
    },
    organization: {
      type: organizationType
    }
  })
})

export default category
