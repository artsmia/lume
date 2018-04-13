import User_Organization from '../../db/models/User_Organization'
import Organization from '../../db/models/Organization'

export default async function (src, args, {verified, userId, authentication}){
  try {

    if (authentication){
      return authentication
    }

    let auth = {
      user: {
        id: userId,
      },
      timestamp: Date.now(),
    }

    let userOrganizations = await User_Organization.findAll({
      where: {
        userId
      },
      include: [{
        model: Organization,
        as: 'organization'
      }]
    })

    auth.permissions = userOrganizations.map(({organization,role}) => ({
      organization,
      role
    }))


    return auth
  } catch (ex) {
    console.error(ex)
  }
}
