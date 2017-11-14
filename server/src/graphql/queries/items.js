import itemModel from '../../db/models/item'
import organizationModel from '../../db/models/organization'
import {Op} from 'sequelize'
import createOptions from '../filter'

export default async function items(src, args, ctx){
  try {

    let items

    let options = await createOptions(args.filter)

    if (args.search) {
      Object.assign(options.where, {
        title: {
          [Op.regexp]: args.search
        }
      })
    }

    if (args.orgSub) {
      let org = await organizationModel.findOne({where: {
        subdomain: args.orgSub
      }})

      items = await org.getItems(options)
    }

    if (!args.orgSub) {
      items = await itemModel.findAll(options)
    }


    return items
  } catch (ex) {
    console.error(ex)
  }
}
