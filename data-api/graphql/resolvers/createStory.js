import Organization from '../../db/models/Organization'
import Story from '../../db/models/Story'

export default async function(src, args, ctx){
  try {

    let organization = await Organization.findOne({
      where: {
        ...args.organization
      }
    })


    return await Story.create({
      organizationId: organization.id,
      creatorId: args.creatorId
    })

  } catch (ex) {
    console.error(ex)
  }
}
