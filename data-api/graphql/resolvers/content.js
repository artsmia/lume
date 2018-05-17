import Content from '../../db/models/Content'

export default async function(src, args, ctx) {
  try {
    return await Content.findOne({
      where: args
    })
  } catch (ex) {
    console.error(ex)
  }
}
