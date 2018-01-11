import AWS from 'aws-sdk'
import uuid from 'uuid/v4'
import fs from 'fs'
import rimraf from 'rimraf'
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



    await upload({
      Key: `${organization.id}/${fileId}/original`,
      Bucket: "mia-lume",
      Body: buffer,
      ACL: "public-read",
      ContentType: mimetype
    })


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
