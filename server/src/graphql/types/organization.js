import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} from 'graphql'
import userType from './user'

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
    users: {
      type: new GraphQLList(userType),
      resolve: async (organization) => {
        try {



          return {}
        } catch (ex) {
          console.log(ex)
        }
      }
    },
  })
})

export default organization
