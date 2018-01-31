import Organization from '../../db/models/Organization'

export default async function(src, args, ctx){
  try {


    console.log(args)

    await Organization.update(args, {
      where: {
        id: args.id
      }
    })

    const organization = await Organization.findById(args.id)


    return organization

  } catch (ex) {
    console.error(ex)
  }
}
