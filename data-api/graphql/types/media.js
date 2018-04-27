import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} from 'graphql'
import organizationType from './organization'
import {HostEnum} from './enums'

const media = new GraphQLObjectType({
  name: "media",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    title: {
      type: GraphQLString
    },
    host: {
      type: HostEnum
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
    format: {
      type: GraphQLString
    },
  })
})

export default media
