import Detail from '../../../db/models/Detail'

export default async function(src, args, ctx){
  try {


    return await Detail.destroy({
      where: {
        ...args
      }
    })

  } catch (ex) {
    console.error(ex)
  }
}
