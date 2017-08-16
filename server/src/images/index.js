import AWS from 'aws-sdk'
import uuid from 'uuid/v4'
import sharp from 'sharp'

const s3 = new AWS.S3()

export default async function (req,res, next) {
  try {

    const {
      file: {
        mimetype,
        buffer
      },
      body: {
        bucket
      }
    } = req

    const fileId = uuid()

    const {Buckets} = await listBuckets()

    if (
      !Buckets.find((item => {
        return item.Name === bucket
      }))
    ) {
      await createBucket({
        Bucket: bucket,
        ACL: "public-read"
      })
    }

    const thumb = await sharp(buffer).resize(100).toBuffer()


    const result = await upload({
      Key: fileId,
      Bucket: bucket,
      Body: buffer,
      ACL: "public-read",
      ContentType: mimetype
    })

    const thumbResult = await upload({
      Key: `${fileId}--s`,
      Bucket: bucket,
      Body: thumb,
      ACL: "public-read",
      ContentType: mimetype
    })

    console.log(thumbResult)

    req.body = {
      query: `mutation {
        editOrCreateImage(
          id: "${fileId}"
          organizationId: "${bucket}"
        ) {
          id
        }
      }`
    }

    next()


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


function listBuckets () {
  return new Promise( (resolve, reject) => {
    s3.listBuckets( (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

function createBucket(params){
  return new Promise( (resolve, reject) => {
    s3.createBucket(params, (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}
