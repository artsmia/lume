import Obj from '../../db/models/Obj'

export default async function(src, args, ctx) {
  try {
    await Obj.update(args.obj, {
      where: {
        id: args.obj.id
      }
    })

    return await Obj.findById(args.obj.id)
  } catch (ex) {
    console.error(ex)
  }
}
