import AWS from 'aws-sdk'

const s3 = new AWS.S3()

export default function (req,res, next) {
  try {

    console.log("upload", req.file)

    const params = {
      Key: req.file.originalname,
      Bucket: "mia-knight",
      Body: req.file.buffer
    }

    s3.upload(params, (err, data) => {
      console.log(err, data)
      res.send({
        gotcha: "bro"
      })
    })



  } catch (ex) {

  }
}
