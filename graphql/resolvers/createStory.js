import Organization from '../../db/models/Organization'
import Story from '../../db/models/Story'

export default async function(src, args, ctx){
  try {


    return await Story.create(args, {
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
