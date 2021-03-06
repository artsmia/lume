import Model from '../../db/models/Obj'
import Organization from '../../db/models/Organization'
import createOptions from './filter'

export default async function(src, args, ctx) {
  try {
    const { filter } = args

    let org = await Organization.findOne({
      where: {
        subdomain: filter.organization.subdomain
      }
    })

    let result = []

    if (
      org.customObjApiEnabled &&
      org.customObjApiEndpoint &&
      org.objSearchEndpoint
    ) {
      if (!filter.search) {
        return []
      }

      let resp = await fetch(`${org.objSearchEndpoint}${filter.search}`)

      let { data } = await resp.json()

      data = data.map(item => ({
        ...item,
        id: `localId:${item.localId}`
      }))

      results.push(...data)
    }
    let options = filter ? createOptions(filter) : {}

    let objs = await Model.findAll(options)
    results.push(...objs)

    return resulta
  } catch (ex) {
    console.error(ex)
  }
}
