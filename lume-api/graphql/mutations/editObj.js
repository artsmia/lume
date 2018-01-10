import {
  GraphQLID,
  GraphQLNonNull
} from 'graphql'
import objType from '../types/obj'
import resolve from '../resolvers/editObj'
import {OrganizationInput, ObjInput} from '../types/inputs'


const editObj = {
  name: "editObj",
  type: objType,
  args: {
    obj: {
      type: new GraphQLNonNull(ObjInput)
    }
  },
  resolve
}

export default editObj
