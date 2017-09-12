import pageModel from '../../db/models/page'

export default async function editOrCreatePage(src, args, ctx){
  try {
    const {
      imagesIds,
      title,
      text,
      video,
      type
    } = args

    let page

    console.log(args)

    if (!args.id){
      page = await pageModel.create()
    } else {
      page = await pageModel.update({
        title,
        text,
        video,
        type
      }, {
        where: {
          id: args.id
        }
      })
      page = await pageModel.findById(args.id)

    }

    if (imagesIds) {
      await page.setImages(imagesIds)
    }

    return page
  } catch (ex) {
    console.error(ex)
  }
}
