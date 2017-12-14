import Detail from '../../../db/models/Detail'

export default async function(src, args, ctx){
  try {

    return await Detail.findById(args.id)

  } catch (ex) {
    console.error(ex)
  }
}
