import AWS from 'aws-sdk'
import uuid from 'uuid/v4'
import Organization from '../db/models/Organization'

const s3 = new AWS.S3()

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
        description,
        localId
      }
    } = req

    const organization = await Organization.findOne({
      where: {
        subdomain
      }
    })

    console.log(req.file, mimetype)

    // let media = await organization.createMedia({
    //   title,
    //   description,
    //   localId,
    //   host: 's3'
    // })
    //
    //
    // const fileId = media.id
    //
    //
    // await upload({
    //   Key: `${fileId}/original.${mimetype}`,
    //   Bucket: "mia-lume",
    //   Body: buffer,
    //   ACL: "public-read",
    //   ContentType: mimetype,
    //   Tagging: `organization=${organization.id}`
    // })


    res.json({
      data: {
        media: media.dataValues
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
