import Content from '../../db/models/Content'

export default async function(src, args, ctx){
  try {

    let content = await Content.update(args.content, {
      where: {
        id: args.content.id
      }
    })

    return await Content.findById(args.id)

  } catch (ex) {
    console.error(ex)
  }
}
