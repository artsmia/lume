

const Obj = {
  async primaryImage(src, args){
    try {

      return await src.getPrimaryImage()
    } catch (ex) {
      console.error(ex)
    }
  },
}

export default Obj
