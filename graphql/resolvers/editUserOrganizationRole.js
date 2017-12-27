import User_Organization from '../../db/models/User_Organization'
import Organization from '../../db/models/Organization'

export default async function(src, args, ctx){
  try {


    await User_Organization.findOrCreate({
      where: {
        userId: args.userId,
        organizationId: args.organization.id,
      }
    })

    await User_Organization.update({
      role: args.role
    },{
      where: {
        userId: args.userId,
        organizationId: args.organization.id,
      }
    })

    let userOrgs = await User_Organization.findAll({
      where: {
        userId: args.userId
      },
      include:[{
        model: Organization,
        as: "organization"
      }]
    })


    let result = {
      id: args.userId,
      organizations: userOrgs.map(userOrg => ({
        ...userOrg.organization.dataValues,
        role: userOrg.role
      }))
    }

    return result

  } catch (ex) {
    console.error(ex)
  }
}
