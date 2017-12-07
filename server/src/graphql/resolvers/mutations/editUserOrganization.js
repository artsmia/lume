import Organization from '../../../db/models/Organization'
import User_Organization from '../../../db/models/User_Organization'

export default async function(src, args, ctx){
  try {



    const userOrg = await User_Organization.findOrCreate({
      where: args
    })

     let user = {
       id: args.userId
     }

     return user

  } catch (ex) {
    console.error(ex)
  }
}
