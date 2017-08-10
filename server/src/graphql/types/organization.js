import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} from 'graphql'
import userType from './user'
import itemType from './item'

const organization = new GraphQLObjectType({
  name: "organization",
  fields: ()=> ({
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    subdomain: {
      type: GraphQLString
    },
    // users: {
    //   type: new GraphQLList(userType),
    //   resolve: async (organization) => {
    //     try {
    //
    //
    //
    //       return {}
    //     } catch (ex) {
    //       console.log(ex)
    //     }
    //   }
    // },
    items: {
      type: new GraphQLList(itemType),
      resolve: async (organization) => {
        try {
          const items = await organization.getItems()
          return items
        } catch (ex) {
          console.error(ex)
        }
      }
    }
  })
})

export default organization
