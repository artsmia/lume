import pageModel from '../../db/models/page'
import pageComparisonImageModel from '../../db/models/pageComparisonImage'

const Page = {
  async comparisonImages(page){
    try {

      const comparisonImages = await pageComparisonImageModel.findAll({
        where: {
          pageId: page.id
        }
      })

      return comparisonImages

    } catch (ex) {
      console.error(ex)
    }
  },
  async mainImage({id}){
    try {
      const page = await pageModel.findById(id)

      const mainImage =  await page.getMainPageImage()
      return mainImage
    } catch (ex) {
      console.error(ex)
    }
  },
}

export default Page
