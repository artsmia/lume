import Story from '../../db/models/Story'
import { Op } from 'sequelize'

export default async function(src, args, ctx) {
  try {
    let updates = args
    if (updates.slug) {
      updates.slug = updates.slug
        .trim()
        .replace(/[^a-zA-Z0-9]+/g, '-')
        .toLowerCase()

      let story = await Story.findById(args.id)

      let existingStory = await Story.findAll({
        where: {
          organizationId: story.organizationId,
          id: {
            [Op.not]: story.id
          },
          slug: updates.slug
        }
      })

      if (existingStory.length > 0) {
        updates.slug = updates.slug.concat(`-${args.id.substring(0, 5)}`)
      }
    }

    await Story.update(
      {
        ...updates
      },
      {
        where: {
          id: args.id
        }
      }
    )

    const story = await Story.findById(args.id)

    if (args.addRelatedStoryId) {
      await story.addRelatedStories(args.addRelatedStoryId)
    }

    if (args.removeRelatedStoryId) {
      await story.removeRelatedStories(args.removeRelatedStoryId)
    }

    if (args.setGroupsIds) {
      await story.setGroups(args.setGroupsIds)
    }

    return story
  } catch (ex) {
    console.error(ex)
  }
}
