import thematicModel from '../../db/models/thematic'
import createOptions from '../filter'
import chalk from 'chalk'
import organizationModel from '../../db/models/organization'
import {Op} from 'sequelize'

export default async function thematics(src, args, ctx){
  try {

    let thematics
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

      thematics = await org.getThematics(options)
    }

    if (!args.orgSub) {
      thematics = await thematicModel.findAll(options)
    }


    return thematics
  } catch (ex) {
    console.error(ex)
  }
}
