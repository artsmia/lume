import Comparison from '../../../db/models/Comparison'
import Detail from '../../../db/models/Detail'
import Obj from '../../../db/models/Obj'
import Movie from '../../../db/models/Movie'
import Picture from '../../../db/models/Picture'
import Story from '../../../db/models/Story'



export default async function(src, args, ctx){
  try {

    let story = await Story.findById(args.storyId)

    let content

    switch (args.type) {
      case "comparison": {

        content = await Comparison.create()
      }
      case "detail": {

        content = await Detail.create()
      }
      case "obj": {

        content = await Obj.create()
      }
      case "movie": {

        content = await Movie.create()
      }
      case "picture": {

        content = await Picture.create()
      }
      default: {

        break
      }
    }

    await content.addStory(story)

    return content

  } catch (ex) {
    console.error(ex)
  }
}
