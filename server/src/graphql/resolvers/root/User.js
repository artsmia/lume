import User_Organization from '../../../db/models/User_Organization'
import Organization from '../../../db/models/Organization'


const User = {
  async organizations(user){
    try {


      const userOrgs = await User_Organization.findAll({
        where: {
          userId: user.id
        }
      })

      const orgIds = userOrgs.map( ({organizationId}) => organizationId)

      const organizations = await Organization.findAll({
        where: {
          $or: [
            {
              id: orgIds
            }
          ]
        }
      })

      return organizations
    } catch (ex) {
      console.error(ex)
    }
  }
}

export default User
