import Organization from '../../db/models/Organization'
import Story from '../../db/models/Story'
import { Op } from 'sequelize'

export default async function(src, args, ctx) {
  try {
    let organization = await Organization.findOne({
      where: {
        ...args.organization
      }
    })

    let slug = args.title
      .trim()
      .replace(/\s/g, '-')
      .replace(/[^a-zA-Z0-9'"-]+/g, '')
      .toLowerCase()

    let storiesWithSlug = await Story.findAll({
      where: {
        organizationId: organization.id,
        slug
      }
    })

    if (storiesWithSlug.length > 0) {
      slug = slug.concat(`-${storiesWithSlug.length + 1}`)
    }

    return await Story.create({
      organizationId: organization.id,
      creatorId: args.creatorId,
      title: args.title,
      slug
    })
  } catch (ex) {
    console.error(ex)
  }
}
