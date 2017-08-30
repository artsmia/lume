import clipModel from '../../db/models/clip'

const Clip = {
  async detail(argClip) {
    try {
      const clip = await clipModel.findById(argClip.id)

      return await clip.getDetail()
    } catch (ex) {
      console.error(ex)
    }
  },
}

export default Clip
