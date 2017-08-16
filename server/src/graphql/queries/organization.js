import organizationModel from '../../db/models/organization'

export default async function organization(src, {id, subdomain}, ctx){
  try {

    let organization

    if (id) {
      organization = await organizationModel.findOne({
        where: {
          id,
        }
      })
    } else if (subdomain) {
      organization = await organizationModel.findOne({
        where: {
          subdomain,
        }
      })
    }


    return organization

  } catch (ex) {
    console.error(ex)
  }
}
