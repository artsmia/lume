import Comparison from '../../../db/models/Comparison'
import Detail from '../../../db/models/Detail'
import Movie from '../../../db/models/Movie'
import Obj from '../../../db/models/Obj'
import Picture from '../../../db/models/Picture'

export default async function(src, args, ctx){
  try {

    const {
      id,
      type
    } = args

    let content = {}

    switch (type) {
      case "Comparison": {
        content = await Comparison.findById(id)
        break
      }
      case "Detail": {
        content = await Detail.findById(id)
        break
      }
      case "Movie": {
        content = await Movie.findById(id)
        break
      }
      case "Obj": {
        content = await Obj.findById(id)
        break
      }
      case "Picture": {
        content = await Picture.findById(id)
        break
      }
      default: {

        break
      }
    }

    content.type = type

    return content

  } catch (ex) {
    console.error(ex)
  }
}
