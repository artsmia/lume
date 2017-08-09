import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} from 'graphql'
import organizationType from './organization'
import organizationModel from '../../db/models/organization'
import userOrganization from '../../db/models/userOrganization'

const user = new GraphQLObjectType({
  name: "user",
  fields: ()=> ({
    id: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    organizations: {
      type: new GraphQLList(organizationType),
      resolve: async (user) => {
        const orgConnections = await userOrganization.findAll({
          where: {
            userId: user.id
          }
        })
        const orgIds = orgConnections.map( org => org.dataValues.organizationId)

        const organizations = await Promise.all(
          orgIds.map(orgId => organizationModel.findById(orgId))
        )

        return organizations
      }
    }
  })
})

export default user
