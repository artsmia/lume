import {getUser} from '../../api/auth/management'
import User_Organization from '../../db/models/User_Organization'
import Organization from '../../db/models/Organization'


export default async function (src, {id}, ctx){
  try {

    let userId = (id) ? id : ctx.userId


    const user = await getUser(userId)


    if (!user.id) {
      user.id = userId
    }

    const userOrgs = await User_Organization.findAll({
      where: {
        userId
      },
      include:[{
        model: Organization,
        as: "organization"
      }]
    })

    user.organizations = userOrgs.map(userOrg => ({
      ...userOrg.organization.dataValues,
      role: userOrg.role
    }))


    return user
  } catch (ex) {
    console.error(ex)
  }
}

export async function organizationsResolve(src, args, ctx) {
  try {

    console.log("user org", src)


    return organizations
  } catch (ex) {
    console.error(ex)
  }
}
