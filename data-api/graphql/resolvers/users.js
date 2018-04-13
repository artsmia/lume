import UserOrganization from '../../db/models/User_Organization'
import createOptions from './filter'
import auth0 from '../../auth/auth0'
import {retrieveUserProfile} from './user'

export default async function (src, args, ctx){
  try {
    const {
      filter
    } = args

    let options = (filter) ? createOptions(filter) : {}

    let userOrgs = await UserOrganization.findAll(options)


    let users = userOrgs.map(({userId, role}) => ({
      id: userId,
      role
    }))


    for (let i = 0; i < users.length; i++) {
      let profile = await retrieveUserProfile(users[i].id)
      Object.assign(users[i], profile)
    }

    return users

  } catch (ex) {
    console.error(ex)
  }
}
