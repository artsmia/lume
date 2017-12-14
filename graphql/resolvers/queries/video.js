import Video from '../../../db/models/Video'

export default async function(src, args, ctx){
  try {

    return await Video.findById(args.id)

  } catch (ex) {
    console.error(ex)
  }
}
