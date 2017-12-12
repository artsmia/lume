import Story from '../../../db/models/Story'



export default async function(src, args, ctx){
  try {

    const {
      type,
      storyId
    } = args

    let story = await Story.findById(storyId)


    let comparisons = await story.getComparisons()
    let details = await story.getDetails()
    let movies = await story.getMovies()
    let objs = await story.getObjs()
    let pictures = await story.getPictures()
    let existingContents = [
      ...comparisons,
      ...details,
      ...movies,
      ...objs,
      ...pictures
    ]

    let index = existingContents.length

    let content

    let options = {
      through: {
        index
      }
    }

    switch (type) {
      case "Comparison": {
        content = await story.createComparison({},options)
        break
      }
      case "Detail": {

        content = await story.createDetail({},options)
        break
      }
      case "Obj": {

        content = await story.createObj({},options)
        break
      }
      case "Movie": {

        content = await story.createMovie({},options)

        break
      }
      case "Picture": {

        content = await story.createPicture({},options)
        break
      }
      default: {

        break
      }
    }

    content.type = type
    content.index = index

    return content

  } catch (ex) {
    console.error(ex)
  }
}
