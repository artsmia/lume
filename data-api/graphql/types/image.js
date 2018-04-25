import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} from 'graphql'
import organizationType from './organization'
import {HostEnum} from './enums'

const image = new GraphQLObjectType({
  name: "image",
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
    metadata: {
      type: GraphQLString
    },
    captionCredit: {
      type: GraphQLString
    },
  })
})

export default image
