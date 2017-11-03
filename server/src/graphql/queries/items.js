import itemModel from '../../db/models/item'
import organizationModel from '../../db/models/organization'
import {Op} from 'sequelize'


export default async function items(src, {organizationId, orgSub, groupId, search, filter}, ctx){
  try {

    let options = {
      include: [],
      order: [],
      where: {

      }
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
            text: {
              [Op.regexp]: search
            }
          }
        ]
      })
    }

    if (organizationId){
      options.include.push({
        model: organizationModel,
        as: "organizations",
        where: {
          id: organizationId
        }
      })
    }

    if (orgSub){
      options.include.push({
        model: organizationModel,
        as: "organizations",
        where: {
          subdomain: orgSub
        }
      })
    }

    if (filter) {

      if (filter.order) {

        let newFilters = filter.order.map( ({column,direction}) => ([column, direction]))

        options.order = newFilters
      }

      if (filter.limit) {
        options.limit = filter.limit
      }

      if (filter.offset) {
        options.offset = filter.offset
      }

    }

    console.log(options, options.include)


    return await itemModel.findAll(options)
  } catch (ex) {
    console.error(ex)
  }
}
