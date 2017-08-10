import {
  GraphQLString
} from 'graphql'
import organizationModel from '../../db/models/organization'
import organizationType from '../types/organization'

const organization = {
  type: organizationType,
  args: {
    id: {
      type: GraphQLString
    },
    subdomain: {
      type: GraphQLString
    }
  },
  resolve: async (src, {id, subdomain}, context) => {
    try {

      let organization

      if (id) {
        organization = await organizationModel.findOne({
          where: {
            id,
          }
        })
      }

      if (subdomain) {
        organization = await organizationModel.findOne({
          where: {
            subdomain
          }
        })
      }


      return organization
    } catch (ex) {
      console.log("organization error", ex)
      return "organization error"
    }
  }
}

export default organization
