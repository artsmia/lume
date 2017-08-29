import imageModel from '../../db/models/image'

const Image = {
  async organization(argImage) {
    try {
      const image = await imageModel.findById(argImage.id)

      return await image.getOrganization()
    } catch (ex) {
      console.error(ex)
    }
  },
}

export default Image
