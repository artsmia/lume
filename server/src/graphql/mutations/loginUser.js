import {
  GraphQLString
} from 'graphql'
import userType from '../types/user'
import userModel from '../../db/models/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const loginUser = {
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

      const user = await userModel.findOne({
        where: {
          email
        }
      })

      if (!user) {
        throw "user does not exist"
      }

      const match = await bcrypt.compare(password, user.password)

      if (!match) {
        throw "password is incorrect"
      }

      const token = await jwt.sign({
        exp: Math.floor(Date.now() / 1000) + 172800  //two days
      }, process.env.jwtSecret)

      return {
        email: user.email,
        token
      }
    } catch (ex) {
      console.log("loginUser error", ex)
      return ex
    }
  }
}

export default loginUser
