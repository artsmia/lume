import thematicModel from '../../db/models/thematic'


export default async function deleteThematic(src, {id}, ctx) {
  try {
    let thematic = await thematicModel.findById(id)
    await thematic.destroy()
    return item
    return
  } catch (ex) {
    console.error(ex)
  }
}
