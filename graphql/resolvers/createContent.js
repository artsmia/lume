import Organization from '../../db/models/Organization'
import Content from '../../db/models/Content'

export default async function(src, args, ctx){
  try {


    return await Content.create(args)

  } catch (ex) {
    console.error(ex)
  }
}
