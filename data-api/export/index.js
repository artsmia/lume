import fs from 'fs'
import Category from '../db/models/Category'
import Content from '../db/models/Content'
import Group from '../db/models/Group'
import Image from '../db/models/Image'
import Media from '../db/models/Media'
import Obj from '../db/models/Obj'
import Organization from '../db/models/Organization'
import Story from '../db/models/Story'

export default async function exporter() {
  try {
    let subdomain = 'mia'

    let organization = await Organization.findOne({
      where: {
        subdomain
      },
      include: [
        {
          model: Category,
          as: 'categories',
          include: [
            {
              model: Group,
              as: 'groups'
            }
          ]
        }
      ]
    })

    let stories = await Story.findAll({
      where: {
        organizationId: organization.id
      },
      include: [
        {
          model: Image,
          as: 'previewImage'
        },
        {
          model: Story,
          as: 'relatedStories'
        },
        {
          model: Content,
          as: 'contents',
          include: [
            {
              model: Obj,
              as: 'obj',
              include: [
                {
                  model: Image,
                  as: 'primaryImage'
                }
              ]
            },
            {
              model: Image,
              as: 'image0'
            },
            {
              model: Image,
              as: 'image1'
            },
            {
              model: Image,
              as: 'additionalImages'
            },
            {
              model: Media,
              as: 'additionalMedias'
            }
          ]
        }
      ]
    })

    let data = JSON.stringify({ organization, stories })

    fs.writeFile(`${__dirname}/data.json`, data, 'utf8', function(err) {
      if (err) {
        return console.log(err)
      }

      console.log('The file was saved!')
    })
  } catch (ex) {
    console.error(ex)
  }
}
