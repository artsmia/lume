import Story from '../../db/models/Story'

export default async function(src, args, ctx){
  try {


    await Story.update(args, {
      where: {
        id: args.id
      }
    })

    const story = await Story.findById(args.id)

    if (args.addRelatedStoryId){
      await story.addRelatedStories(args.addRelatedStoryId)
    }

    if (args.removeRelatedStoryId){
      await story.removeRelatedStories(args.removeRelatedStoryId)
    }

    if (args.setGroupsIds){
      await story.setGroups(args.setGroupsIds)
    }

    return story

  } catch (ex) {
    console.error(ex)
  }
}
