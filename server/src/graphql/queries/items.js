import itemModel from '../../db/models/item'
import organizationModel from '../../db/models/organization'
import {Op} from 'sequelize'
import createOptions from '../filter'

export default async function items(src, args, ctx){
  try {

    // let options = {
    //   include: [],
    //   order: [],
    //   where: {
    //
    //   }
    // }
    //
    // if (search) {
    //   Object.assign(options.where, {
    //     [Op.or]: [
    //       {
    //         title: {
    //           [Op.regexp]: search
    //         }
    //       },
    //       {
    //         text: {
    //           [Op.regexp]: search
    //         }
    //       }
    //     ]
    //   })
    // }
    //
    // if (organizationId){
    //   options.include.push({
    //     model: organizationModel,
    //     as: "organizations",
    //     where: {
    //       id: organizationId
    //     }
    //   })
    // }
    //
    // console.log("orgSub", orgSub)


    // if (orgSub){
    //
    //   let organization = await organizationModel.findOne({
    //     where: {
    //       subdomain: orgSub
    //     }
    //   })
    //
    //   options.include.push({
    //     model: organizationModel,
    //     as: "organizations",
    //     through: {
    //       attributes: ["subdomain"],
    //       where: {
    //         organizationId: organization.id
    //       }
    //     }
    //   })
    // }

    // if (orgSub){
    //   options.include.push({
    //     model: organizationModel,
    //     as: "organizations",
    //     where: {
    //       subdomain: orgSub
    //     }
    //   })
    // }
    //
    //
    // if (filter) {
    //
    //   if (filter.order) {
    //
    //     let newFilters = filter.order.map( ({column,direction}) => ([column, direction]))
    //
    //     options.order = newFilters
    //   }
    //
    //   if (filter.limit) {
    //     options.limit = filter.limit
    //   }
    //
    //   if (filter.offset) {
    //     options.offset = filter.offset
    //   }
    //
    // }
    //
    // console.log("options", options, options.include)

    if (args.orgSub === "mcn") {
      let organization = await organizationModel.findOne({
        where: {
          subdomain: args.orgSub
        }
      })

      let items = await organization.getItems()

      return items
    }


    let options = await createOptions(args.filter)


    if (args.search) {
      Object.assign(options.where, {
        title: {
          [Op.regexp]: args.search
        }
      })
    }


    if (args.orgSub){
      options.include.push({
        model: organizationModel,
        as: "organizations",
        where: {
          subdomain: args.orgSub
        }
      })
    }


    let items = await itemModel.findAll(options)

    return items
  } catch (ex) {
    console.error(ex)
  }
}
