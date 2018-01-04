import AWS from 'aws-sdk'
import uuid from 'uuid/v4'
import sharp from 'sharp'
import fs from 'fs'
import rimraf from 'rimraf'
import Organization from '../../db/models/Organization'

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

    let bucket = organization.id


    const fileId = image.id


    if (process.env.FILE_STORAGE === "local") {

      let directory = `localFileStorage/${fileId}`

      await sharp(buffer).png().tile({size: 512, layout: 'zoomify'}).toFile(directory)

      await sharp(buffer).toFile(`${directory}/original.jpeg`)

      await sharp(buffer).resize(100).toFile(`${directory}/s.jpeg`)

      await sharp(buffer).resize(400).toFile(`${directory}/m.jpeg`)

      return res.json({done: "woo"})

    }


    const s = await sharp(buffer).resize(100).toBuffer()

    const m = await sharp(buffer).resize(400).toBuffer()

    let filePath = `${__dirname}`

    await sharp(buffer).png().tile({size: 512, layout: 'zoomify'}).toFile(`${filePath}/${fileId}`)


    const {Buckets} = await listBuckets()

    if (
      !Buckets.find((item => {
        return item.Name === bucket
      }))
    ) {
      await createBucket({
        Bucket: bucket,
        ACL: "public-read",
      })
    }

    await upload({
      Key: `${fileId}/original`,
      Bucket: bucket,
      Body: buffer,
      ACL: "public-read",
      ContentType: mimetype
    })

    await upload({
      Key: `${fileId}/s`,
      Bucket: bucket,
      Body: s,
      ACL: "public-read",
      ContentType: mimetype
    })

    await upload({
      Key: `${fileId}/m`,
      Bucket: bucket,
      Body: m,
      ACL: "public-read",
      ContentType: mimetype
    })

    const files = await readDir(`/${fileId}/TileGroup0`)


    await Promise.all(
      files.map( file => bulkUpload(file, fileId, bucket))
    )


    await deleteDirectory(`/${fileId}`)


    res.json({
      msg: "success"
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

      console.log(data)

      s3.putBucketTagging({
        Bucket: data.Location.substring(1),
        Tagging: {
          TagSet: [
            {
              Key: "mia",
              Value: "",
            }, {
              Key: "database",
              Value: process.env.DATABASE
            }
          ]
        }
      }, (err, data) => {
        if (err) reject(err)
        resolve(data)
      })


    })
  })
}

function readFile(path){
  return new Promise( (resolve, reject) => {
    fs.readFile(__dirname + path, (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

function readDir(path){
  return new Promise( (resolve, reject) => {
    fs.readdir(__dirname + path, (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

async function bulkUpload(file, fileId, bucket){
  try {
    const buffer = await readFile(`/${fileId}/TileGroup0/${file}`)
    await upload({
      Key: `${fileId}/tiles/${file}`,
      Bucket: bucket,
      Body: buffer,
      ACL: "public-read",
      ContentType: 'image/png'
    })
  } catch (ex) {
    console.error(ex)
  }
}

function deleteDirectory(path){
  return new Promise( (resolve, reject) => {
    rimraf(`${__dirname}${path}`, (err) => {
      console.log(err)
      resolve()
    })
  })
}
