import Story from '../../db/models/Story'

export default async function(src, args, ctx) {
  try {
    await Story.destroy({
      where: {
        id: args.id
      }
    })

    return 'Success'
  } catch (ex) {
    console.error(ex)
  }
}
