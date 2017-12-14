import Obj from '../../../db/models/Obj'

export default async function(src, args, ctx){
  try {


    return await Obj.destroy({
      where: {
        ...args
      }
    })

  } catch (ex) {
    console.error(ex)
  }
}
