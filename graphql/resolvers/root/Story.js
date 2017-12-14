

const Story = {
  async previewImage(story){
    try {

      return await story.getPreviewImage()
    } catch (ex) {
      console.error(ex)
    }
  },
  async contents(story){
    try {

      let comparisons = await story.getComparisons().map( item => ({
        ...item.dataValues,
        type: "Comparison"
      }))

      let details = await story.getDetails().map( item => ({
        ...item.dataValues,
        type: "Detail"
      }))


      let movies = await story.getMovies().map( item => ({
        ...item.dataValues,
        type: "Movie"
      }))


      let objs = await story.getObjs().map( item => ({
        ...item.dataValues,
        type: "Obj"
      }))


      let pictures = await story.getPictures().map( item => ({
        ...item.dataValues,
        type: "Picture"
      }))




      let contents = [
        ...comparisons,
        ...details,
        ...movies,
        ...objs,
        ...pictures
      ]

      return contents

    } catch (ex) {
      console.error(ex)
    }
  },
  async organization(story){
    try {

      return await story.getOrganization()
    } catch (ex) {
      console.error(ex)
    }
  },
}

export default Story
