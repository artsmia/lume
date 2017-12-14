import Image from '../../../db/models/Image'

export default async function(src, args, ctx){
  try {

    return await Image.findById(args.id)

  } catch (ex) {
    console.error(ex)
  }
}
