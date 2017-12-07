import Story from '../../../db/models/Story'

export default async function(src, args, ctx){
  try {


    return await Story.destroy({
      where: {
        ...args
      }
    })

  } catch (ex) {
    console.error(ex)
  }
}
