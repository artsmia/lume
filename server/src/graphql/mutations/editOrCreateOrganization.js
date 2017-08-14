import organizationModel from '../../db/models/organization'
import userOrganizationModel from '../../db/models/userOrganization'

export default async function editOrCreateOrganization(src, args, ctx){
  try {
    let organization

    const {
      id,
      name,
      subdomain,
      newUserIds
    } = args

    if (id) {
      await organizationModel.update({
        name,
        subdomain,
      }, {
        where: {
          id
        }
      })
      organization = await organizationModel.findById(id)
    } else {
      organization = await organizationModel.create({
        ...args
      })
    }

    if (newUserIds) {
      await Promise.all(
        newUserIds.map( userId => userOrganizationModel.create({
          userId,
          organizationId: organization.id
        }))
      )
    }
    return organization
  } catch (ex) {
    console.error(ex)
  }
}
