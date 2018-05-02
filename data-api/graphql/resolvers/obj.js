import Obj from '../../db/models/Obj'
import Organization from '../../db/models/Organization'
import fetch from 'isomorphic-unfetch'


export default async function(src, args, ctx){
  try {

    let obj

    if (args.id) {
      obj = await Obj.findOne({
        where: {
          id: args.id
        },
        include: [{
          model: Organization,
          as: 'organization'
        }]
      })
    } else {
      obj = await src.getObj({
        include: [{
          model: Organization,
          as: 'organization'
        }]
      })
    }

    if (!obj) return null

    if (
      obj.pullFromCustomApi &&
      obj.organization.customObjApiEndpoint &&
      obj.organization.customObjApiEnabled

    ){


      let resp = await fetch(obj.organization.customObjApiEndpoint, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id: obj.localId
        })
      })

      let json = await resp.json()
      // obj = {
      //   ...obj.dataValues,
      //   ...json.obj,
      // }
      Object.assign(obj.dataValues, json.obj)
    }

    return obj

  } catch (ex) {
    console.error(ex)
  }
}
