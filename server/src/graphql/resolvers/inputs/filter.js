import Organization from '../../../db/models/Organization'
import {Op} from 'sequelize'

export default function({
  orgSub,
  search,
  order,
  limit,
  offset
}){
  let options = {}
  if (orgSub) {
    options.include = [{
      model: Organization,
      as: "organization",
      where: {
        subdomain: orgSub
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
