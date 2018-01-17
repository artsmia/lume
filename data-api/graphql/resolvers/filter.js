import Organization from '../../db/models/Organization'
import {Op} from 'sequelize'

export default function({
  organization: {
    subdomain,
    id: organizationId
  },
  search,
  order,
  limit,
  offset,
  template,
  visibility
}){
  let options = {
    where: {

    }
  }
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
    Object.assign(options.where, {
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
    })
  }

  if (template) {
    Object.assign(options.where, {
      template: {
        [Op.or]: template
      }
    })
  }

  if (visibility) {
    Object.assign(options.where, {
      visibility: {
        [Op.or]: visibility
      }
    })
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
