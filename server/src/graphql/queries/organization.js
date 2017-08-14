import organizationModel from '../../db/models/organization'

export default async function organization(src, {id, subdomain}, ctx){
  try {

    if (id) {
      return await organizationModel.findOne({
        where: {
          id,
        }
      })
    }

    if (subdomain) {
      return await organizationModel.findOne({
        where: {
          subdomain,
        }
      })
    }



  } catch (ex) {
    console.error(ex)
  }
}
