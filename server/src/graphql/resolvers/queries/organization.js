import Organization from '../../../db/models/Organization'

export default async function(src, args, ctx){
  try {

    return await Organization.findOne({
      where: args
    })

  } catch (ex) {
    console.error(ex)
  }
}
