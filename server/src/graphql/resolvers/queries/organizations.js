import Organization from '../../../db/models/Organization'
import filterOptions from '../inputs/filter'

export default async function(src, args, ctx){
  try {

    const {
      filter
    } = args

    let options = filterOptions(filter)

    return await Organization.findAll(options)

  } catch (ex) {
    console.error(ex)
  }
}
