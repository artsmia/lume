import Comparison from '../../../db/models/Comparison'

export default async function(src, args, ctx){
  try {


    return await Comparison.destroy({
      where: {
        ...args
      }
    })

  } catch (ex) {
    console.error(ex)
  }
}
