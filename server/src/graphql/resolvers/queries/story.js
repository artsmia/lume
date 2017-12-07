import Story from '../../../db/models/Story'

export default async function(src, args, ctx){
  try {

    return await Story.findById(args.id)

  } catch (ex) {
    console.error(ex)
  }
}
