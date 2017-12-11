import Organization from '../../../db/models/Organization'
import {Op} from 'sequelize'

export default function({
  organizationId,
  subdomain,
  search,
  order,
  limit,
  offset
}){
  let options = {}
  if (organizationId) {
    options.include = [{
      model: Organization,
      as: "organization",
      where: {
        id: organizationId
      }
    }]
  }

  if (subdomain) {
    options.include = [{
      model: Organization,
      as: "organization",
      where: {
        subdomain: subdomain
      }
    }]
  }

  if (search) {
    options.where = {
      [Op.or]: [
        {
          title: {
            [Op.regexp]: search
          }
        },
        {
          description: {
            [Op.regexp]: search
          }
        },
      ]
    }
  }
  if (order) {
    options.order = order.map( ({column,direction}) => ([column, direction]))
  }

  if (limit) {
    options.limit = limit
  }

  if (offset) {
    options.offset = offset
  }

  return options

}
