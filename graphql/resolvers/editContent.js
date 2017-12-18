import Content from '../../db/models/Content'

export default async function(src, args, ctx){
  try {

    console.log(args)

    let content = await Content.update(args, {
      where: {
        id: args.id
      }
    })

    return await Content.findById(args.id)

  } catch (ex) {
    console.error(ex)
  }
}
