import User_Organization from '../../db/models/User_Organization'

export default async function(src, args, ctx){
  try {


    await User_Organization.update({
      where: {
        userId: args.userId,
        organizationId: args.organization.id,
        role: args.role
      }
    })

    return await User_Organization.findOne({
      where: {
        id: args.userId
      }
    })

  } catch (ex) {
    console.error(ex)
  }
}
