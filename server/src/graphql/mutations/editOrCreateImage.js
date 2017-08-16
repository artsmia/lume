import imageModel from '../../db/models/image'


export default async function editOrCreateImage(src, args, ctx){
  try {
    const {
      id,
      organizationId,
    } = args
    const image = await imageModel.create({
      id,
    })
    await image.setOrganization(organizationId)

    return image
  } catch (ex) {
    console.error(ex)
  }
}
