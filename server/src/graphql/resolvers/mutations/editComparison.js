import Comparison from '../../../db/models/Comparison'

export default async function(src, args, ctx){
  try {

    await Comparison.upsert(args)

    return await Comparison.findById(args.id)

  } catch (ex) {
    console.error(ex)
  }
}
