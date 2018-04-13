import User_Organization from '../../db/models/User_Organization'
import Organization from '../../db/models/Organization'
import auth0 from '../../auth/auth0'


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

    let profile = await retrieveUserProfile(user.id)

    Object.assign(user, profile)

    return user
  } catch (ex) {
    console.error(ex)
  }
}

export async function retrieveUserProfile(userId){
  try {
    let {
      email,
      given_name: given,
      family_name: family,
      picture
    } = await auth0.getUser({
      id: userId,
    })

    return {
      email,
      name: {
        given,
        family
      },
      picture
    }
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
