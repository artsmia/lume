import itemModel from '../../db/models/item'
import organizationModel from '../../db/models/organization'

export default async function items(src, {organizationId, orgSub, groupId, search, filter}, ctx){
  try {

    let options = {
      include: [],
      order: []
    }

    if (search) {
      Object.assign(options, {
        where: {
          title: {
            $regexp: search
          }
        }
      })
    }

    if (organizationId){
      options.include.push({
        model: organizationModel,
        as: "organizations",
        where: {
          id: organizationId
        }
      })
    }

    if (orgSub){
      options.include.push({
        model: organizationModel,
        as: "organizations",
        where: {
          subdomain: orgSub
        }
      })
    }

    if (filter) {

      if (filter.order) {

        let newFilters = filter.order.map( ({column,direction}) => ([column, direction]))

        options.order = newFilters
      }

      if (filter.limit) {
        options.limit = filter.limit
      }

      if (filter.offset) {
        options.offset = filter.offset
      }

    }

    console.log(options)


    // Object.assign(options, {
    //   limit: 10
    // })
    //
    // options.order.push(
    //   ['updatedAt', 'DESC']
    // )


    // options.push({
    //   limit: 10
    // })
    //
    // options.push({
    //   order: [
    //     "title", "DES"
    //   ]
    // })


    return await itemModel.findAll(options)
  } catch (ex) {
    console.error(ex)
  }
}
