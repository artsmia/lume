import thematicModel from '../../db/models/thematic'

const Thematic = {
  async pages({id}){
    try {

      const thematic = await thematicModel.findById(id)

      return await thematic.getPages()
    } catch (ex) {
      console.error(ex)
    }
  },
  async relatedObjs({id}){
    try {
      const thematic = await thematicModel.findById(id)
      return await thematic.getRelatedObjs()
    } catch (ex) {
      console.error(ex)
    }
  },
  async previewImage({id}){
    try {

      const thematic = await thematicModel.findById(id)

      return await thematic.getPreviewImage()
    } catch (ex) {
      console.error(ex)
    }
  },
}

export default Thematic
