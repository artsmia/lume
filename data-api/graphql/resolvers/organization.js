import Organization from '../../db/models/Organization'
import { Op } from 'sequelize'

export default async function(src, args, ctx) {
  try {
    const { id, subdomain } = args.organization

    return await Organization.findOne({
      where: {
        [Op.or]: [
          {
            id
          },
          {
            subdomain
          }
        ]
      }
    })
  } catch (ex) {
    console.error(ex)
  }
}
