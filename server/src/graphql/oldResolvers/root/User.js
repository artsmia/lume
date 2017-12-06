import userOrganizationModel from '../../db/models/userOrganization'
import organizationModel from '../../db/models/organization'


const User = {
  async organizations(user){
    try {
      const userOrgs = await userOrganizationModel.findAll({
        where: {
          userId: user.id
        }
      })

      const orgIds = userOrgs.map( ({organizationId}) => organizationId)

      const organizations = await organizationModel.findAll({
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
