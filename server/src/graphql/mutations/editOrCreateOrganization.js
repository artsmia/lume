import organizationModel from '../../db/models/organization'
import userOrganizationModel from '../../db/models/userOrganization'

export default async function editOrCreateOrganization(src, args, ctx){
  try {
    let organization

    const {
      id,
      name,
      subdomain,
      newUserIds,
      customItemApiEnabled,
      customItemApiEndpoint,
      customImageApiEnabled,
      customImageEndpoint,
      customImageTileEndpoint,
      customImageThumbEndpoint,
      customImageInfoEndpoint
    } = args

    if (id) {
      await organizationModel.update({
        name,
        subdomain,
        customItemApiEnabled,
        customItemApiEndpoint,
        customImageApiEnabled,
        customImageEndpoint,
        customImageTileEndpoint,
        customImageThumbEndpoint,
        customImageInfoEndpoint
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
          organizationId: organization.id,
          role: (organization.newUsersRequireApproval) ? "pending" : "contributor"
        }))
      )

      let users = await userOrganizationModel.findAll({
        where: {
          organizationId: organization.id
        }
      })

      if (users.length === 1) {
        await userOrganizationModel.update({
          role: "admin"
        }, {
          where: {
            userId: users[0].userId,
            organizationId: organization.id
          }
        })
      }

    }
    return organization
  } catch (ex) {
    console.error(ex)
  }
}
