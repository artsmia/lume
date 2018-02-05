import Category from '../../db/models/Category'

export default async function(src, args, ctx){
  try {

    return await Category.findOne({
      where: args
    })

  } catch (ex) {
    console.error(ex)
  }
}
