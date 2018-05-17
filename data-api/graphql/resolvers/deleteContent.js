import Content from '../../db/models/Content'

export default async function(src, args, ctx) {
  try {
    await Content.destroy({
      where: {
        id: args.id
      }
    })

    return 'Success'
  } catch (ex) {
    console.error(ex)
  }
}
