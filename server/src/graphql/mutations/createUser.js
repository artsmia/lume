import {
  GraphQLString
} from 'graphql'
import userType from '../types/user'
import userModel from '../../db/models/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


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


      const token = await jwt.sign({
        exp: Math.floor(Date.now() / 1000) + 172800  //two days
      }, process.env.jwtSecret)

      return {
        email: user.email,
        token
      }
    } catch (ex) {
      console.log("createUser error", ex)
      return "createUser error"
    }
  }
}

export default createUser
