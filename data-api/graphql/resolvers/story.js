import Story from '../../db/models/Story'
import Organization from '../../db/models/Organization'


export default async function(src, args, ctx){
  try {

    let story

    if (args.id){
      return await Story.findOne({
        where: {
          id: args.id
        }
      })
    }

    if (args.slugInput){
      let organization = await Organization.findOne({
        where: args.slugInput.organization
      })

      return await Story.findOne({
        where: {
          organizationId: organization.id,
          slug: args.slugInput.slug
        }
      })
    }

  } catch (ex) {
    console.error(ex)
  }
}

export async function organizationResolver(src, args, ctx){
  try {

    return await src.getOrganization()
  } catch (ex) {
    console.error(ex)
  }
}
