import Content from '../../db/models/Content'

export default async function(src, args, ctx){
  try {

    let contents = await Content.findAll({
      where: {
        storyId: args.storyId
      }
    })

    return await Content.create({
      ...args,
      index: contents.length
    })

  } catch (ex) {
    console.error(ex)
  }
}
