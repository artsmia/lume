import AWS from 'aws-sdk'
import uuid from 'uuid/v4'
import Organization from '../db/models/Organization'

const s3 = new AWS.S3()

export default async function(req, res, next) {
  try {
    const {
      file: { mimetype, buffer },
      body: { subdomain, title, description, localId }
    } = req

    const organization = await Organization.findOne({
      where: {
        subdomain
      }
    })

    let format = mimetype.split('/')[1]

    let image = await organization.createImage({
      title,
      description,
      localId,
      format
    })

    const fileId = image.id

    await upload({
      Key: `${fileId}/original.${format}`,
      Bucket: 'mia-lume',
      Body: buffer,
      ACL: 'public-read',
      ContentType: mimetype,
      Tagging: `organization=${organization.id}`
    })

    res.json({
      data: {
        image: image.dataValues
      }
    })
  } catch (ex) {
    console.log(ex)
  }
}

function upload(params) {
  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        console.log("upload error", err)
        reject(err)
      }
      resolve(data)

    })
  })
}
