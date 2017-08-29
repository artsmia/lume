import detailModel from '../../db/models/detail'

const Detail = {
  async image(argDetail) {
    try {
      const detail = await detailModel.findById(argDetail.id)

      return await detail.getImage()
    } catch (ex) {
      console.error(ex)
    }
  },
}

export default Detail
