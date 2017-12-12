

const Movie = {
  async video(src, args){
    try {

      return await src.getVideo()
    } catch (ex) {
      console.error(ex)
    }
  },
}

export default Movie
