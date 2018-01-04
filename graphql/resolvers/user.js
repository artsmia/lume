import User_Organization from '../../db/models/User_Organization'
import Organization from '../../db/models/Organization'


export default async function (src, {id}, ctx){
  try {

    const userOrgs = await User_Organization.findAll({
      where: {
        userId: id
      },
      include:[{
        model: Organization,
        as: "organization"
      }]
    })

    let user = {
      id,
      organizations: userOrgs.map(userOrg => ({
        ...userOrg.organization.dataValues,
        role: userOrg.role
      }))

    }

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
