import Image from '../../db/models/Image'

export default async function(src, args, ctx) {
  try {
    await Image.update(args, {
      where: {
        id: args.id
      }
    })

    const image = await Image.findById(args.id)

    return image
  } catch (ex) {
    console.error(ex)
  }
}
