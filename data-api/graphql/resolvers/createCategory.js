import Organization from '../../db/models/Organization'
import Category from '../../db/models/Category'

export default async function(src, args, ctx){
  try {

    let organization = await Organization.findOne({
      where: {
        ...args.organization
      }
    })


    return await Category.create({
      organizationId: organization.id,
    })

  } catch (ex) {
    console.error(ex)
  }
}
