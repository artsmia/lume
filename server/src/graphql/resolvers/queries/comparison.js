import Model from '../../../db/models/Comparison'

export default async function(
  src,
  args,
  ctx
){
  try {

    return await Model.findById(args.id)

  } catch (ex) {
    console.error(ex)
  }
}
