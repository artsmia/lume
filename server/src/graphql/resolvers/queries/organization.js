import Organization from '../../../db/models/Organization'

export default async function(src, args, ctx){
  try {

    return await Organization.findById(args.id)

  } catch (ex) {
    console.error(ex)
  }
}
