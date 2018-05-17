import Group from '../../db/models/Group'

export default async function(src, args, ctx) {
  try {
    return await Group.create({
      categoryId: args.categoryId
    })
  } catch (ex) {
    console.error(ex)
  }
}
