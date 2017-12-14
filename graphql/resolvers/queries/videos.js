import Video from '../../../db/models/Video'
import Organization from '../../../db/models/Organization'
import {Op} from 'sequelize'

export default async function(src, args, ctx){
  try {

    const {
      orgSub,
      search,
      filter
    } = args

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

    if (filter) {

      if (filter.order) {
        options.order = filter.order.map( ({column,direction}) => ([column, direction]))
      }

      if (filter.limit) {
        options.limit = filter.limit
      }

      if (filter.offset) {
        options.offset = filter.offset
      }
    }


    return await Video.findAll(options)

  } catch (ex) {
    console.error(ex)
  }
}
