import imageModel from '../../db/models/image'
import createOptions from '../filter'
import chalk from 'chalk'
import {Op} from 'sequelize'

export default async function images(src, args, ctx){
  try {

    let options = await createOptions(args.filter)

    if (args.search) {
      Object.assign(options.where, {
        [Op.or]: [
          {
            title: {
              [Op.regexp]: search
            }
          },
          {
            alt: {
              [Op.regexp]: search
            }
          },
        ]
      })
    }

    return await imageModel.findAll(options)
  } catch (ex) {
    console.error(ex)
  }
}
