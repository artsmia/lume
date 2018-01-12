import AWS from 'aws-sdk'
import uuid from 'uuid/v4'
import sharp from 'sharp'
import fs from 'fs'
import rimraf from 'rimraf'
import Organization from '../db/models/Organization'

export default async function (req,res, next) {
  try {

    const {
      file: {
        mimetype,
        buffer
      },
      body: {
        subdomain,
        title,
        description
      }
    } = req

    const organization = await Organization.findOne({
      where: {
        subdomain
      }
    })

    let image = await organization.createImage({
      title,
      description
    })


    const fileId = image.id


    let directory = `local-store/${fileId}`

    await sharp(buffer).png().tile({size: 512, layout: 'zoomify'}).toFile(directory)

    await sharp(buffer).toFile(`${directory}/original.jpeg`)

    await sharp(buffer).resize(100).toFile(`${directory}/s.jpeg`)

    await sharp(buffer).resize(400).toFile(`${directory}/m.jpeg`)

    return res.json({done: "woo"})


  } catch (ex) {
    console.log(ex)
  }
}
