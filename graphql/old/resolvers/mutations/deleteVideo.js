import Video from '../../../db/models/Video'

export default async function(src, args, ctx){
  try {


    return await Video.destroy({
      where: {
        ...args
      }
    })

  } catch (ex) {
    console.error(ex)
  }
}
