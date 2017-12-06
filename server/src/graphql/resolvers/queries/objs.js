import objModel from '../../db/models/obj'
import organizationModel from '../../db/models/organization'
import {Op} from 'sequelize'
import createOptions from '../filter'

export default async function objs(src, args, ctx){
  try {

    let objs

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

      objs = await org.getObjs(options)
    }

    if (!args.orgSub) {
      objs = await objModel.findAll(options)
    }


    return objs
  } catch (ex) {
    console.error(ex)
  }
}
