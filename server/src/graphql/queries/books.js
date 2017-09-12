import bookModel from '../../db/models/book'
import organizationModel from '../../db/models/organization'

export default async function books(src, {organizationId, orgSub, search}, ctx){
  try {

    let options = []

    if (search) {
      options.push({
        where: {
          title: {
            $regexp: search
          }
        }
      })
    }

    if (organizationId){
      options.push({
        include: [{
          model: organizationModel,
          as: "organizations",
          where: {
            id: organizationId
          }
        }]
      })
    }

    if (orgSub){
      options.push({
        include: [{
          model: organizationModel,
          as: "organizations",
          where: {
            subdomain: orgSub
          }
        }]
      })
    }

    return await bookModel.findAll(...options)
  } catch (ex) {
    console.error(ex)
  }
}
