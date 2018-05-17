import Organization from '../../db/models/Organization'

export default async function(src, args, ctx) {
  try {
    await Organization.update(args, {
      where: {
        id: args.id
      }
    })

    const organization = await Organization.findById(args.id)

    if (args.locationImageId) {
      await organization.setLocationImage(args.locationImageId)
    }

    return organization
  } catch (ex) {
    console.error(ex)
  }
}
