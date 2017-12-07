import Movie from '../../../db/models/Movie'

export default async function(src, args, ctx){
  try {


    return await Movie.destroy({
      where: {
        ...args
      }
    })

  } catch (ex) {
    console.error(ex)
  }
}
