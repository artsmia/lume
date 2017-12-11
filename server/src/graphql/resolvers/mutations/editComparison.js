import Comparison from '../../../db/models/Comparison'
import Image from '../../../db/models/Image'


export default async function(src, args, ctx){
  try {

    await Comparison.update(args,{
      where: {
        id: args.id
      },
    })

    let comparison = await Comparison.findOne({
      where: {
        id: args.id
      },
    })

    return comparison

  } catch (ex) {
    console.error(ex)
  }
}
