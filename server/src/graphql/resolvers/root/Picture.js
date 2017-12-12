

const Picture = {
  async image(src, args){
    try {

      return await src.getImage()
    } catch (ex) {
      console.error(ex)
    }
  },
}

export default Picture
