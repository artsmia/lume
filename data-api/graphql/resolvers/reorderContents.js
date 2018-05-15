import Story from "../../db/models/Story"
import Content from "../../db/models/Content"

export default async function(src, args, ctx) {
  try {
    let contents = args.contentIds.slice()

    let story = await Story.findOne({
      where: {
        id: args.storyId
      },
      include: [
        {
          model: Content,
          as: "contents"
        }
      ]
    })

    story.contents.forEach(content => {
      if (!contents.includes(content.id)) {
        contents.push(content.id)
      }
    })

    contents = contents.map((id, index) => {
      return {
        id,
        index
      }
    })

    for (let content of contents) {
      await Content.update(
        {
          index: content.index
        },
        {
          where: {
            id: content.id
          }
        }
      )
    }

    return await Story.findOne({
      where: {
        id: args.storyId
      },
      include: [
        {
          model: Content,
          as: "contents"
        }
      ]
    })
  } catch (ex) {
    console.error(ex)
  }
}
