import Comparison from '../../../db/models/Comparison'
import Story from '../../../db/models/Story'
import Story_Comparison from '../../../db/models/Story_Comparison'
import Sequelize from 'sequelize'
import Detail from '../../../db/models/Detail'
import Movie from '../../../db/models/Movie'
import Obj from '../../../db/models/Obj'
import Picture from '../../../db/models/Picture'

export default async function(src, args, ctx){
  try {

    const {
      id,
      type,
      storyId
    } = args

    let content = {}

    let story = await Story.findOne({
      where: {
        id: storyId
      }
    })

    let options = {
      where: {
        id
      }
    }

    switch (type) {
      case "Comparison": {
        content = await story.getComparisons(options)
        break
      }
      case "Detail": {
        content = await story.getDetails(options)
        break
      }
      case "Movie": {
        content = await story.getMovies(options)
        break
      }
      case "Obj": {
        content = await story.getObjs(options)
        break
      }
      case "Picture": {
        content = await story.getPictures(options)
        break
      }
      default: {

        break
      }
    }

    if (Array.isArray(content)) {
      content = content[0]
    }

    content.type = type

    return content

  } catch (ex) {
    console.error(ex)
  }
}
