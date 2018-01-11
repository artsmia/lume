import Story from '../../db/models/Story'

export default async function(src, args, ctx){
  try {

    return await Story.findOne({
      where: args
    })

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
