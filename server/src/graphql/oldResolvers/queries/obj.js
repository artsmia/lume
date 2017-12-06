import objModel from '../../db/models/obj'
import orgModel from '../../db/models/organization'
import fetch from 'node-fetch'
import chalk from 'chalk'

export default async function obj(src, args, ctx){
  try {


    let {
      id
    } = args

    let obj = await objModel.findById(id)

    if (!obj) return obj


    if (
      obj.pullFromCustomApi &&
      obj.localId
    ) {
      let orgs = await obj.getOrganizations()
      let org = orgs[0]
      if (
        org.customObjApiEnabled &&
        org.customObjApiEndpoint
      ) {

        let url = org.customObjApiEndpoint
        let options = {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            id: obj.localId
          })
        }

        let response = await fetch(url, options)
        let json = await response.json()
        obj = {
          ...obj.dataValues,
          ...json.obj
        }
      }
    }


    return obj
  } catch (ex) {
    console.error(ex)
  }
}
