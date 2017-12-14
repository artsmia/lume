import Image from '../../../db/models/Image'
import Organization from '../../../db/models/Organization'

export default async function(src, args, ctx){
  try {


    return await Image.create(args, {
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
