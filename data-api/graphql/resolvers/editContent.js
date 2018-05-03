import Content from '../../db/models/Content'

export default async function(src, args, ctx){
  try {

    await Content.update(args.content, {
      where: {
        id: args.content.id
      }
    })

    let content = await Content.findById(args.content.id)

    if (args.content.addAdditionalImageId){
      await content.addAdditionalImages(args.content.addAdditionalImageId)
    }

    if (args.content.removeAdditionalImageId){
      await content.removeAdditionalImages(args.content.removeAdditionalImageId)
    }

    if (args.content.addAdditionalMediaId){
      await content.addAdditionalMedias(args.content.addAdditionalMediaId)
    }

    if (args.content.removeAdditionalMediaId){
      await content.removeAdditionalMedias(args.content.removeAdditionalMediaId)
    }

    console.log(content.dataValues)

    return content

  } catch (ex) {
    console.error(ex)
  }
}
