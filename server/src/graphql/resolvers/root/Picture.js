

const Picture = {
  async image(src, args){
    try {

      return await src.getImage()
    } catch (ex) {
      console.error(ex)
    }
  },
  async index(src, args, context, info){
    if (src.index) return src.index

    if (src.story_picture) return src.story_picture.index
  },
}

export default Picture
