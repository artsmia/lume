import imageModel from '../../db/models/image'
import pageComparisonImageModel from '../../db/models/pageComparisonImage'

const Image = {
  async organization(argImage) {
    try {
      const image = await imageModel.findById(argImage.id)

      return await image.getOrganization()
    } catch (ex) {
      console.error(ex)
    }
  },
  // async index(argImage) {
  //   try {
  //     const pageComparisonImage = await pageComparisonImageModel.findAll({
  //       where: {
  //         imageId: argImage.id
  //       }
  //     })
  //
  //     let image = {
  //       ...argImage,
  //       index: pageComparisonImage
  //     }
  //
  //     return {
  //       argImage
  //     }
  //   } catch (ex) {
  //     console.error(ex)
  //   }
  // },
}

export default Image
