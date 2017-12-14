import Image from '../../../db/models/Image'
import filterOptions from '../inputs/filter'

export default async function(src, args, ctx){
  try {

    const {
      filter
    } = args

    let options = filterOptions(filter)

    return await Image.findAll(options)

  } catch (ex) {
    console.error(ex)
  }
}
