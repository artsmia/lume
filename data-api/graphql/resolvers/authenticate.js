import User_Organization from '../../db/models/User_Organization'
import Organization from '../../db/models/Organization'


export default async function (src, args, {verified, userId}){
  try {


    let authentication = {
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

    authentication.permissions = userOrganizations.map(({organization,role}) => ({
      organization,
      role
    }))


    return authentication
  } catch (ex) {
    console.error(ex)
  }
}
