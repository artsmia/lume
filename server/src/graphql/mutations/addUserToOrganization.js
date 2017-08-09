import {
  GraphQLString,
  GraphQLNonNull
} from 'graphql'
import userType from '../types/user'
import userOrganizationModel from '../../db/models/userOrganization'
import {getUser} from '../../auth/management'

const addUserToOrganization = {
  type: userType,
  args: {
    userId: {
      type: new GraphQLNonNull(GraphQLString)
    },
    organizationId: {
      type: new GraphQLNonNull(GraphQLString)
    },
  },
  resolve: async (src, {userId, organizationId}) => {
    try {

      await userOrganizationModel.create({
        userId,
        organizationId
      })

      const user = await getUser(userId)

      return user
    } catch (ex) {
      console.log("addUserToOrganization error", ex)
      return "addUserToOrganization error"
    }
  }
}

export default addUserToOrganization
