import {
  GraphQLString
} from 'graphql'
import userType from '../types/user'
import {getUser} from '../../auth/management'

const user = {
  type: userType,
  args: {
    id: {
      type: GraphQLString
    },
  },
  resolve: async (src, {id}) => {
    try {

      const user = await getUser(id)
      user.id = user["user_id"]

      

      return user
    } catch (ex) {
      console.log("user error", ex)
      return "user error"
    }
  }
}

export default user
