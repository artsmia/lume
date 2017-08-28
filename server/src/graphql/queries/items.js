import itemModel from '../../db/models/item'
import organizationModel from '../../db/models/organization'

export default async function items(src, {organizationId, groupId, search}, ctx){
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

    return await itemModel.findAll(...options)
  } catch (ex) {
    console.error(ex)
  }
}
