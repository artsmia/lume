import Comparison from '../../../db/models/Comparison'
import Detail from '../../../db/models/Detail'
import Obj from '../../../db/models/Obj'
import Movie from '../../../db/models/Movie'
import Picture from '../../../db/models/Picture'
import Story from '../../../db/models/Story'



export default async function(src, args, ctx){
  try {

    const {
      type,
      storyId
    } = args

    let story = await Story.findById(storyId)

    let content

    switch (type) {
      case "Comparison": {
        console.log("in comparison")
        content = await story.createComparison()
        break
      }
      case "Detail": {

        content = await story.createDetail()
        break
      }
      case "Obj": {

        content = await story.createObj()
        break
      }
      case "Movie": {

        content = await story.createMovie()
        break
      }
      case "Picture": {

        content = await story.createPicture()
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
