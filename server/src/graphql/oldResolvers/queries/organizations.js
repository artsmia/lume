import organizationModel from '../../db/models/organization'


export default async function organizations(src, args, ctx){
  try {
    return await organizationModel.findAll()
  } catch (ex) {
    console.error(ex)
  }
}
