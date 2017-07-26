import {
  GraphQLString
} from 'graphql'
import userType from '../types/user'
import userModel from '../../db/models/user'
import bcrypt from 'bcrypt'


const createUser = {
  type: userType,
  args: {
    email: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString
    },
  },
  resolve: async (src, {email, password}) => {
    try {

      const existingUser = await userModel.findOne({
        where: {
          email
        }
      })

      if (existingUser) {
        throw "User already exists."
      }

      const hash = await bcrypt.hash(password, 10)

      const user = await userModel.create({
        email: email,
        password: hash
      })


      return {
        email: user.email
      }
    } catch (ex) {
      console.log("createUser error", ex)
      return "createUser error"
    }
  }
}

export default createUser
