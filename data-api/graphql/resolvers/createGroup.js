import Group from '../../db/models/Group'

export default async function(src, args, ctx){
  try {

    return await Group.create({
      categoryId: category.id,
    })

  } catch (ex) {
    console.error(ex)
  }
}
