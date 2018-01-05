import Obj from '../../db/models/Obj'

export default async function(src, args, ctx){
  try {

    return await Obj.findOne({
      where: args
    })

  } catch (ex) {
    console.error(ex)
  }
}
