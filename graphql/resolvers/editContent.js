import Content from '../../db/models/Content'

export default async function(src, args, ctx){
  try {

    await Content.update(args.content, {
      where: {
        id: args.content.id
      }
    })

    return await Content.findById(args.content.id)

  } catch (ex) {
    console.error(ex)
  }
}
