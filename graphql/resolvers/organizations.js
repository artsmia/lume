import {getUser} from '../../api/auth/management'
import Model from '../../db/models/Organization'
import createOptions from './filter'

export default async function (src, args, ctx){
  try {
    const {
      filter
    } = args

    let options = (filter) ? createOptions(filter) : {}

    return await Model.findAll(options)
  } catch (ex) {
    console.error(ex)
  }
}
