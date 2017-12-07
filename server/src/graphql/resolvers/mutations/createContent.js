import Comparison from '../../../db/models/Comparison'
import Detail from '../../../db/models/Detail'
import Obj from '../../../db/models/Obj'
import Movie from '../../../db/models/Movie'
import Picture from '../../../db/models/Picture'



export default async function(src, args, ctx){
  try {


    switch (args.type) {
      case "comparison": {

        return await Comparison.create(...args)
      }
      case "detail": {

        return await Detail.create(...args)
      }
      case "obj": {

        return await Obj.create(...args)
      }
      case "movie": {

        return await Movie.create(...args)
      }
      case "picture": {

        return await Picture.create(...args)
      }
      default: {

        break
      }
    }


  } catch (ex) {
    console.error(ex)
  }
}
