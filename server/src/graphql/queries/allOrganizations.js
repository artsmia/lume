import {
  GraphQLList,
  GraphQLInt
} from 'graphql'
import organizationType from '../types/organization'
import organizationModel from '../../db/models/organization'

const allOrganizations = {
  type: new GraphQLList(organizationType),
  args: {
    first: {
      type: GraphQLInt
    },
  },
  resolve: async (src, args) => {
    try {
      console.log("allOrgs")
      const organizations = await organizationModel.findAll()
      return organizations
    } catch (ex) {
      console.log("allOrganizations error")
      return "allOrganizations error"
    }
  }
}

export default allOrganizations
