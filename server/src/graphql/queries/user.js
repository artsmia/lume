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
  resolve: async (src, {id}, context) => {
    try {

      let userId = (id) ? id : context.userId

      const user = await getUser(userId)

      if (!user.id) {
        user.id = user["user_id"]
      }



      return user
    } catch (ex) {
      console.log("user error", ex)
      return "user error"
    }
  }
}

export default user
