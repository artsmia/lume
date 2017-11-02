import pageModel from '../../db/models/page'

export default async function editOrCreatePage(src, args, ctx){
  try {
    const {
      mainImageId,
      comparisonImage0,
      comparisonImage1,
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

    if (comparisonImage0) {
      await page.setComparisonImage0(comparisonImage0)
    }

    if (comparisonImage1) {
      await page.setComparisonImage1(comparisonImage1)
    }

    if (mainImageId) {
      await page.setMainImage(mainImageId)
    }


    return page
  } catch (ex) {
    console.error(ex)
  }
}
