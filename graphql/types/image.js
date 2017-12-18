import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} from 'graphql'
import organizationType from './organization'

const image = new GraphQLObjectType({
  name: "image",
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
    localId: {
      type: GraphQLString
    },
    organization: {
      type: organizationType,
      async resolve(src){
        try {
          return await src.getOrganization()
        } catch (ex) {
          console.error(ex)
        }
      }
    },
    metadata: {
      type: GraphQLString
    },
  })
})

export default image
