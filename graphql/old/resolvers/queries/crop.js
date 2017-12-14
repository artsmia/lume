import Crop from '../../../db/models/Crop'

export default async function(src, args, ctx){
  try {

    return await Crop.findById(args.id)

  } catch (ex) {
    console.error(ex)
  }
}
