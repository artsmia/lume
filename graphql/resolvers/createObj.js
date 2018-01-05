import Organization from '../../db/models/Organization'
import Obj from '../../db/models/Obj'

export default async function(src, args, ctx){
  try {

    let organization = await Organization.findOne({
      where: {
        ...args.organization
      }
    })


    return await Obj.create({
      organizationId: organization.id,
    })

  } catch (ex) {
    console.error(ex)
  }
}
