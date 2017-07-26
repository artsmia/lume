import {
  GraphQLList
} from 'graphql'
import userType from '../types/user'
import userModel from '../../db/models/user'

const allUsers = {
  type: new GraphQLList(userType),
  resolve: async (src, args) => {
    try {
      const users = await userModel.findAll()
      return [...users]
    } catch (ex) {
      console.log("allUsers error")
      return "allusers error"
    }
  }
}

export default allUsers
