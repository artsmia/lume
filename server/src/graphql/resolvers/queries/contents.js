


export default async function(
  {
    storyId
  },
  id,
  ctx
){
  try {
    return await story.findAll({})

  } catch (ex) {
    console.error(ex)
  }
}
