import imageModel from '../../db/models/image'
import organizationModel from '../../db/models/organization'
import createOptions from '../filter'
import chalk from 'chalk'
import {Op} from 'sequelize'

export default async function images(src, args, ctx){
  try {

    let options = await createOptions(args.filter)
    let images

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


    if (args.orgSub) {
      let org = await organizationModel.findOne({where: {
        subdomain: args.orgSub
      }})

      images = await org.getImages(options)
    }

    if (!args.orgSub) {
      images = await imageModel.findAll(options)
    }


    return images
  } catch (ex) {
    console.error(ex)
  }
}
