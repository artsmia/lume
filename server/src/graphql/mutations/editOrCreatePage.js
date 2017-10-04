import pageModel from '../../db/models/page'
import pageComparisonImageModel from '../../db/models/pageComparisonImage'

export default async function editOrCreatePage(src, args, ctx){
  try {
    const {
      mainImageId,
      comparisonImages,
      title,
      text,
      video,
      type,
      index
    } = args

    let page


    if (!args.id){
      page = await pageModel.create({
        title: "New Page"
      })
    } else {
      page = await pageModel.update({
        title,
        text,
        video,
        type,
        index
      }, {
        where: {
          id: args.id
        }
      })
      page = await pageModel.findById(args.id)

    }

    if (comparisonImages) {
      console.log(comparisonImages)
    }

    if (mainImageId) {
      await page.setMainPageImage(mainImageId)
    }


    return page
  } catch (ex) {
    console.error(ex)
  }
}
