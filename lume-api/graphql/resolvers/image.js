import Image from '../../db/models/Image'

export default async function(src, args, ctx){
  try {

    return await Image.findOne({
      where: args
    })

  } catch (ex) {
    console.error(ex)
  }
}
