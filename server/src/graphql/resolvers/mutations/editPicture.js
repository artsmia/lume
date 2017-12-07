import Model from '../../../db/models/Picture'

export default async function(src, args, ctx){
  try {

    await Model.upsert(args)

    return await Model.findById(args.id)

  } catch (ex) {
    console.error(ex)
  }
}
