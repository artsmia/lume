import bookModel from '../../db/models/book'
import createOptions from '../filter'
import chalk from 'chalk'
import organizationModel from '../../db/models/organization'
import {Op} from 'sequelize'

export default async function books(src, args, ctx){
  try {


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

    console.log(options, options.include)


    const books = await bookModel.findAll(options)


    return books
  } catch (ex) {
    console.error(ex)
  }
}
