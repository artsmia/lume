import Model from '../../db/models/Obj'
import Organization from '../../db/models/Organization'
import createOptions from './filter'

export default async function (src, args, ctx){
  try {
    const {
      filter
    } = args

    let org = await Organization.findOne({
      where: {
        subdomain: filter.organization.subdomain
      }
    })


    if (
      org.customObjApiEnabled &&
      org.customObjApiEndpoint &&
      org.objSearchEndpoint
    ) {

      if (!filter.search){
        return []
      }

      let resp = await fetch(`${org.objSearchEndpoint}${filter.search}`)


      let {data} = await resp.json()


      data = data.map(item => ({
        ...item,
        id: `localId:${item.localId}`
      }))

      return data

    } else {


      let options = (filter) ? createOptions(filter) : {}

      let objs = await Model.findAll(options)
      return objs


    }








  } catch (ex) {
    console.error(ex)
  }
}
