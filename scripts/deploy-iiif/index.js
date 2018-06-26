import 'dotenv/config'
import AWS from 'aws-sdk'
import fs from 'fs'

const lam = new AWS.Lambda({
  lambda: '2015-03-31',
  region: 'us-west-2'
})

fs.readFile('../iiif/IIIF.zip', (err, ZipFile) => {
  let params = {
    FunctionName: 'lume-iiif',
    Publish: true,
    ZipFile
  }

  lam.updateFunctionCode(params, (err, data) => {
    if (err) console.log(err)
    console.log(data)

    process.exit()
  })
})
