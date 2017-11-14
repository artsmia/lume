import organizationModel from '../../db/models/organization'

export default async function organization(src, {id, orgSub}, ctx){
  try {

    let organization

    if (id) {
      organization = await organizationModel.findOne({
        where: {
          id,
        }
      })
    } else if (orgSub) {
      organization = await organizationModel.findOne({
        where: {
          subdomain: orgSub,
        }
      })
    }


    return organization

  } catch (ex) {
    console.error(ex)
  }
}
