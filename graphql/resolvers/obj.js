import Obj from '../../db/models/Obj'
import Organization from '../../db/models/Organization'
import fetch from 'isomorphic-unfetch'


export default async function(src, args, ctx){
  try {

    let obj

    if (args.id) {
      obj = await Obj.findById(args.id)
    } else {
      obj = await src.getObj()
    }

    if (!obj) return null


    if (obj.pullFromCustomApi){
      let {
        customObjApiEndpoint
      } = await Organization.findById(obj.organizationId)

      let resp = await fetch(customObjApiEndpoint, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id: obj.localId
        })
      })

      let json = await resp.json()
      obj = {
        ...obj,
        ...json.obj,
      }
    }

    return obj

  } catch (ex) {
    console.error(ex)
  }
}
