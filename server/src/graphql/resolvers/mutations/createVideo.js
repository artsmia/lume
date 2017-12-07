import Organization from '../../../db/models/Organization'
import Video from '../../../db/models/Video'

export default async function(src, args, ctx){
  try {


    return await Video.create(args, {
      include: [
        {
          model: Organization,
          as: "organization"
        }
      ]
    })

  } catch (ex) {
    console.error(ex)
  }
}
