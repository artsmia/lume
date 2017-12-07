import Story from '../../../db/models/Story'
import filterOptions from '../inputs/filter'

export default async function(src, args, ctx){
  try {

    const {
      filter
    } = args

    let options = filterOptions(filter)

    return await Story.findAll(options)

  } catch (ex) {
    console.error(ex)
  }
}
