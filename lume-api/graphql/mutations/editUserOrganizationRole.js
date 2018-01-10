import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
} from 'graphql'
import userType from '../types/user'
import resolve from '../resolvers/editUserOrganizationRole'
import {OrganizationInput} from '../types/inputs'
import {RoleEnum} from '../types/enums'

const editUserOrganizationRole = {
  name: "editUserOrganizationRole",
  type: userType,
  args: {
    userId: {
      type: new GraphQLNonNull(GraphQLID)
    },
    organization: {
      type: new GraphQLNonNull(OrganizationInput)
    },
    role: {
      type: RoleEnum
    }
  },
  resolve
}

export default editUserOrganizationRole
