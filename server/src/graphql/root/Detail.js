import detailModel from '../../db/models/detail'
import clipModel from '../../db/models/clip'

const Detail = {
  async image(argDetail) {
    try {
      const detail = await detailModel.findById(argDetail.id)

      return await detail.getImage()
    } catch (ex) {
      console.error(ex)
    }
  },
  async clips(detail) {
    try {

      return await clipModel.findAll({
        where: {
          detailId: detail.id
        }
      })
    } catch (ex) {
      console.error(ex)
    }
  },
}

export default Detail
