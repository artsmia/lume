import thematicModel from '../../db/models/thematic'

export default async function thematic(src, {id}, ctx){
  try {
    let thematic = await thematicModel.findById(id)
    return thematic.dataValues
  } catch (ex) {
    console.error(ex)
  }
}
