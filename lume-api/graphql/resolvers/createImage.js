import Organization from '../../db/models/Organization'
import Image from '../../db/models/Image'

export default async function(src, args, ctx){
  try {

    let organization = await Organization.findOne({
      where: {
        ...args.organization
      }
    })


    return await Image.create({
      organizationId: organization.id,
      ...args
    })

  } catch (ex) {
    console.error(ex)
  }
}
