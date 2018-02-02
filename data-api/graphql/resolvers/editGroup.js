import Group from '../../db/models/Group'

export default async function(src, args, ctx){
  try {


    await Group.update(args, {
      where: {
        id: args.id
      }
    })

    const group = await Group.findById(args.id)

    return group

  } catch (ex) {
    console.error(ex)
  }
}
