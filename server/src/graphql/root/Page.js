import pageModel from '../../db/models/page'

const Page = {
  async images({id}){
    try {
      const page = await pageModel.findById(id)

      const images =  await page.getImages()
      return images
    } catch (ex) {
      console.error(ex)
    }
  },
}

export default Page
