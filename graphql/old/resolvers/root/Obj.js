

const Obj = {
  async primaryImage(src, args){
    try {

      return await src.getPrimaryImage()
    } catch (ex) {
      console.error(ex)
    }
  },
  async index(src, args, context, info){
    if (src.index) return src.index

    if (src.story_obj) return src.story_obj.index
  },
}

export default Obj
