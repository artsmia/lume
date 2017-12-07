import Picture from '../../../db/models/Picture'

export default async function(src, args, ctx){
  try {

    return await Picture.findById(args.id)

  } catch (ex) {
    console.error(ex)
  }
}
