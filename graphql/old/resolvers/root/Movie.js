

const Movie = {
  async video(src, args){
    try {

      return await src.getVideo()
    } catch (ex) {
      console.error(ex)
    }
  },
  async index(src, args, context, info){
    if (src.index) return src.index

    if (src.story_movie) return src.story_movie.index
  },
}

export default Movie
