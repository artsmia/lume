import Comparison from '../../../db/models/Comparison'
import Detail from '../../../db/models/Detail'
import Movie from '../../../db/models/Movie'
import Obj from '../../../db/models/Obj'
import Picture from '../../../db/models/Picture'

export default async function(src, args, ctx){
  try {

    const {
      contentId,
      type
    } = args


    switch (type) {
      case "Comparison": {
        return await Comparison.findById(contentId)
      }
      case "Detail": {
        return await Detail.findById(contentId)
      }
      case "Movie": {
        return await Movie.findById(contentId)
      }
      case "Obj": {
        return await Obj.findById(contentId)
      }
      case "Picture": {
        return await Picture.findById(contentId)
      }
      default: {

        return null
      }
    }

  } catch (ex) {
    console.error(ex)
  }
}
