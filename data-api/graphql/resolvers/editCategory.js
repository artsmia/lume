import Category from '../../db/models/Category'

export default async function(src, args, ctx) {
  try {
    await Category.update(args, {
      where: {
        id: args.id
      }
    })

    const category = await Category.findById(args.id)

    return category
  } catch (ex) {
    console.error(ex)
  }
}
