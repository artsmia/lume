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
  name: "category",
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
      type: imageType
    },
    groups: {
      type: new GraphQLList(groupType)
    },
    organization: {
      type: organizationType
    }
  })
})

export default category
