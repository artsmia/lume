import bookModel from '../../db/models/book'
import createOptions from '../filter'
import chalk from 'chalk'
import organizationModel from '../../db/models/organization'
import {Op} from 'sequelize'

export default async function books(src, args, ctx){
  try {

    let books
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

      console.log(options)

      books = await org.getBooks(options)
    }

    if (!args.orgSub) {
      books = await bookModel.findAll(options)
    }


    console.log(books)

    return books
  } catch (ex) {
    console.error(ex)
  }
}
