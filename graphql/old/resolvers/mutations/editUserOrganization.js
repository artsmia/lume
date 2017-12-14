import User_Organization from '../../../db/models/User_Organization'

export default async function(src, args, ctx){
  try {

    let users = await User_Organization.findAll({
      where: {
        organizationId: args.organizationId
      }
    })

    let role = (users.length < 1) ? "admin" : "contributor"

    const userOrg = await User_Organization.findOrCreate({
      where: {
        ...args,
        role
      }
    })

     let user = {
       id: args.userId
     }

     return user

  } catch (ex) {
    console.error(ex)
  }
}
