import Movie from '../../../db/models/Movie'

export default async function(src, args, ctx){
  try {

    return await Movie.findById(args.id)

  } catch (ex) {
    console.error(ex)
  }
}
