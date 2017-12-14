import {getUser} from '../../auth-api/management'
import User_Organization from '../../db/models/User_Organization'
import Organization from '../../db/models/Organization'


export default async function (src, {id}, ctx){
  try {

    let userId = (id) ? id : ctx.userId


    const user = await getUser(userId)


    if (!user.id) {
      user.id = userId
    }


    return user
  } catch (ex) {
    console.error(ex)
  }
}

export async function organizationsResolve(src, args, ctx) {
  try {

    const userOrgs = await User_Organization.findAll({
      where: {
        userId: src.id
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
