import Picture from '../../../db/models/Picture'

export default async function(src, args, ctx){
  try {


    return await Picture.destroy({
      where: {
        ...args
      }
    })

  } catch (ex) {
    console.error(ex)
  }
}
