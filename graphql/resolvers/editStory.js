import Story from '../../db/models/Story'

export default async function(src, args, ctx){
  try {


    let content = await Story.update(args, {
      where: {
        id: args.id
      }
    })

    return await Story.findById(args.id)

  } catch (ex) {
    console.error(ex)
  }
}
