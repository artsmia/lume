import Category from '../../db/models/Category'

export default async function(src, args, ctx){
  try {

    await Category.destroy({
      where: {
        id: args.id
      }
    })

    return "Success"

  } catch (ex) {
    console.error(ex)
  }
}
