import {
  GraphQLString
} from 'graphql'
import organizationType from '../types/organization'
import organizationModel from '../../db/models/organization'

const editOrCreateOrganization = {
  type: organizationType,
  args: {
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    subdomain: {
      type: GraphQLString
    },
  },
  resolve: async (src, argOrg) => {
    try {

      let organization

      if (argOrg.id) {
        await organizationModel.update({
          ...argOrg
        }, {
          where: {
            id: argOrg.id
          }
        })
        organization = await organizationModel.findById(argOrg.id)
      } else {
        organization = await organizationModel.create({
          ...argOrg
        })

      }

      return organization
    } catch (ex) {
      console.log("editOrCreateOrganization error", ex)
      return "editOrCreateOrganization error"
    }
  }
}

export default editOrCreateOrganization
