import AWS from 'aws-sdk'
import uuid from 'uuid/v4'

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

    const result = await upload({
      Key: fileId,
      Bucket: bucket,
      Body: buffer,
      ACL: "public-read",
      ContentType: mimetype
    })

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
