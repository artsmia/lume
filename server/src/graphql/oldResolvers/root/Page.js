import pageModel from '../../db/models/page'

const Page = {

  async mainImage({id}){
    try {
      const page = await pageModel.findById(id)

      const mainImage =  await page.getMainImage()
      return mainImage
    } catch (ex) {
      console.error(ex)
    }
  },
  async comparisonImage0({id}){
    try {
      const page = await pageModel.findById(id)

      const comparisonImage0 =  await page.getComparisonImage0()

      return comparisonImage0
    } catch (ex) {
      console.error(ex)
    }
  },
  async comparisonImage1({id}){
    try {
      const page = await pageModel.findById(id)

      const comparisonImage1 =  await page.getComparisonImage1()
      return comparisonImage1
    } catch (ex) {
      console.error(ex)
    }
  },
}

export default Page
