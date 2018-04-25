import Image from '../../db/models/Image'

export default async function(src, args, ctx){
  try {

    let image = await Image.findOne({
      where: args
    })

    return image

  } catch (ex) {
    console.error(ex)
  }
}
