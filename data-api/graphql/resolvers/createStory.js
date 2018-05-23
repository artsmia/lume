import Organization from '../../db/models/Organization'
import Story from '../../db/models/Story'
import { Op } from 'sequelize'

const searchOp = process.env.DB_MODE === 'mysql' ? Op.regexp : Op.like

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
      .replace(/[^a-zA-Z0-9-]+/g, '')
      .toLowerCase()

    let storiesWithSlug = await Story.findAll({
      where: {
        organizationId: organization.id,
        [Op.or]: [
          {
            slug: slug
          },
          {
            slug: {
              [searchOp]: `${slug}-[0-9]*`
            }
          }
        ]
      },
      logging: true
    })

    if (storiesWithSlug.length > 0) {
      let newIndex = storiesWithSlug.length

      let newSlug = `${slug}-${newIndex}`

      let found = storiesWithSlug.find(story => {
        if (story.slug === newSlug) {
          return true
        } else {
          return false
        }
      })

      while (found) {
        newIndex++
        newSlug = `${slug}-${newIndex}`
        found = storiesWithSlug.find(story => {
          if (story.slug === newSlug) {
            return true
          } else {
            return false
          }
        })
      }

      slug = newSlug
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
