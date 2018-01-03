import AWS from 'aws-sdk'
import sharp from 'sharp'
import fs from 'fs'
import rimraf from 'rimraf'

const s3 = new AWS.S3()

export default async function(event, context, callback){
  try {

    console.log(event)

    callback()
  } catch (ex) {
    console.error(ex)
  }
}
