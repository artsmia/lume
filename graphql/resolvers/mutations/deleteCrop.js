import Crop from '../../../db/models/Crop'

export default async function(src, args, ctx){
  try {


    return await Crop.destroy({
      where: {
        ...args
      }
    })

  } catch (ex) {
    console.error(ex)
  }
}
