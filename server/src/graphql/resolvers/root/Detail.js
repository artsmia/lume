

const Detail = {
  async index(src, args, context, info){
    if (src.index) return src.index

    if (src.story_detail) return src.story_detail.index
  },
}

export default Detail
