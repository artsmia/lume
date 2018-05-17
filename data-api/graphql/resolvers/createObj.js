import Organization from '../../db/models/Organization'
import Obj from '../../db/models/Obj'

export default async function(src, args, ctx) {
  try {
    let organization = await Organization.findOne({
      where: {
        ...args.organization
      }
    })

    console.log(args)

    let [obj] = await Obj.findOrCreate({
      where: {
        localId: args.localId,
        organizationId: organization.id
      },
      defaults: {
        localId: args.localId,
        organizationId: organization.id,
        pullFromCustomApi: args.pullFromCustomApi
      }
    })

    console.log(obj.dataValues)

    return obj
  } catch (ex) {
    console.error(ex)
  }
}
