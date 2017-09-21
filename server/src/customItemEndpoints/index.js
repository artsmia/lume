import getMiaItem from './mia'


export default async function(req, res, next){
  try {

    let data

    switch (req.params.orgSub) {
      case "mia": {
        data = await getMiaItem(req.body.id)
        break
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
