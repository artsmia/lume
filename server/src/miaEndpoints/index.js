import getMiaObj from './miaObj'
import getMiaImage from './miaImage'


export default async function(req, res, next){
  try {

    let data

    switch (req.params.type) {
      case "obj": {
        data = await getMiaObj(req.body.id)
        break
      }
      case "image": {
        data = await getMiaImage(req.body.id)
      }
      default: {
        break
      }
    }

    res.send(data)
  } catch (ex) {
    console.error(ex)
  }
}
