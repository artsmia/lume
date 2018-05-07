import AWS from 'aws-sdk'
import uuid from 'uuid/v4'
import Organization from '../db/models/Organization'

console.log(process.env.AWS_ACCESS_KEY_ID, process.env.AWS_SECRET_ACCESS_KEY)

console.log(process.env)

const s3 = new AWS.S3()

export default async function (req,res, next) {
  try {

    console.log(process.env.AWS_ACCESS_KEY_ID, process.env.AWS_SECRET_ACCESS_KEY)

    const {
      file: {
        mimetype,
        buffer
      },
      body: {
        subdomain,
        title,
        description,
        localId
      }
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
      Bucket: "mia-lume",
      Body: buffer,
      ACL: "public-read",
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

function upload (params) {
  return new Promise( (resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}
