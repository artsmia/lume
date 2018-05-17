import Group from '../../db/models/Group'
import Category from '../../db/models/Category'
import Organization from '../../db/models/Organization'

export default async function(src, args, ctx) {
  try {
    let newSlug = args.slug || undefined
    if (newSlug) {
      newSlug = newSlug
        .trim()
        .replace(/[^a-zA-Z0-9]+/g, '-')
        .toLowerCase()
    }

    await Group.update(
      {
        ...args,
        slug: newSlug
      },
      {
        where: {
          id: args.id
        }
      }
    )

    const group = await Group.findById(args.id)

    return group
  } catch (ex) {
    console.error(ex)
  }
}
