import Obj from '../../../db/models/Obj'

export default async function(src, args, ctx){
  try {

    return await Obj.findById(args.id)

  } catch (ex) {
    console.error(ex)
  }
}
