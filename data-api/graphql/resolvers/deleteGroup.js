import Group from '../../db/models/Group'

export default async function(src, args, ctx) {
  try {
    await Group.destroy({
      where: {
        id: args.id
      }
    })

    return 'Success'
  } catch (ex) {
    console.error(ex)
  }
}
