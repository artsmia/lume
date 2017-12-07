import Organization from '../../../db/models/Organization'
import User_Organization from '../../../db/models/User_Organization'

export default async function(src, args, ctx){
  try {


    return await Organization.create({
      ...args,
      users: [{
        userId: args.creatorId,
        role: "admin"
      }]
    }, {
      include: [
        {
          model: User_Organization,
          as: "users"
        }
      ]
    })

  } catch (ex) {
    console.error(ex)
  }
}
