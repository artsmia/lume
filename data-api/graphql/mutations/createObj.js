import {
  GraphQLID,
  GraphQLNonNull
} from 'graphql'
import objType from '../types/obj'
import resolve from '../resolvers/createObj'
import {OrganizationInput} from '../types/inputs'


const createObj = {
  name: "createObj",
  type: objType,
  args: {
    organization: {
      type: new GraphQLNonNull(OrganizationInput)
    },
  },
  resolve
}

export default createObj
