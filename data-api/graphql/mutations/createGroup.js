import {
  GraphQLID,
  GraphQLNonNull
} from 'graphql'
import groupType from '../types/group'
import resolve from '../resolvers/createGroup'
import {OrganizationInput} from '../types/inputs'


const createGroup = {
  name: "createGroup",
  type: groupType,
  args: {
    categoryId: {
      type: new GraphQLNonNull(GraphQLID)
    },
  },
  resolve
}

export default createGroup
