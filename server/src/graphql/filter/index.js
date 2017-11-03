import {Op} from 'sequelize'
import organizationModel from '../../db/models/organization'

export default async function (filter) {
  try {
    let options = {
      include: [],
      order: [],
      where: {

      }
    }

    if (filter.order) {

      let newOrders = filter.order.map( ({column,direction}) => ([column, direction]))

      options.order = newOrders
    }

    if (filter.limit) {
      options.limit = filter.limit
    }

    if (filter.offset) {
      options.offset = filter.offset
    }

    if (filter.organizationId) {
      Object.assign(options.where, {
        organizationId: filter.organizationId
      })
    }

    if (filter.orgSub) {

      const organization = await organizationModel.findOne({
        where: {
          subdomain: filter.orgSub
        }
      })

      

      Object.assign(options.where, {
        organizationId: organization.id
      })
    }

    return options
  } catch (ex) {
    console.error(ex)
  }

}
