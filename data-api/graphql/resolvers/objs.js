import Model from '../../db/models/Obj'
import Organization from '../../db/models/Organization'
import createOptions from './filter'

export default async function (src, args, ctx){
  try {
    const {
      filter
    } = args

    let options = (filter) ? createOptions(filter) : {}

    let objs = await Model.findAll(options)

    let organization

    if (objs[0]){
      organization = await Organization.findById(objs[0].organizationId)
    }


    for (let [index, obj] of objs.entries()) {
      if (
        obj.pullFromCustomApi &&
        organization.customObjApiEndpoint
      ){

        let resp = await fetch(organization.customObjApiEndpoint, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            id: obj.localId
          })
        })

        let json = await resp.json()

        Object.assign(objs[index], json.obj)
      }
    }





    return objs
  } catch (ex) {
    console.error(ex)
  }
}
