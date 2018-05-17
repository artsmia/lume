import Group from '../../db/models/Group'

export default async function(src, args, ctx) {
  try {
    return await Group.findOne({
      where: args
    })
  } catch (ex) {
    console.error(ex)
  }
}
