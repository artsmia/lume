import User_Organization from '../../db/models/User_Organization'
import Organization from '../../db/models/Organization'
import {retrieveUserProfile} from './user'

export default async function(src, {organization,userId, role}, ctx){
  try {

    const org = await Organization.findOne({
      where: {
        ...organization,
      }
    })

    await User_Organization.upsert(
      {
        role,
        organizationId: org.id,
        userId,
      },
    )

    const userOrg = await User_Organization.findOne({
      where: {
        userId,
        organizationId: org.id
      }
    })

    let user = {
      id: userOrg.userId,
      role: userOrg.role,
    }

    let profile = await retrieveUserProfile(user.id)

    Object.assign(user, profile)

    return user

  } catch (ex) {
    console.error(ex)
  }
}
