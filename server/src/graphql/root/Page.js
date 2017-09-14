import pageModel from '../../db/models/page'

const Page = {
  async comparisonImages({id}){
    try {
      const page = await pageModel.findById(id)

      const comparisonImages =  await page.getComparisonImages()
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
