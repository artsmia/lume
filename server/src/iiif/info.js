import sharp from 'sharp'
import fetch from 'node-fetch'
import imageModel from '../db/models/image'

export default async function(req, res, next){
  try {

    const {
      identifier: imageId,
    } = req.params

    const {
      organizationId
    } = await imageModel.findById(imageId)

    const response = await fetch(
      `https://s3.amazonaws.com/${organizationId}/${imageId}/original`, {
      method: 'GET'
    })


    const buffer = await response.buffer()

    let meta = await sharp(buffer).metadata()


    const info = {
      "@context": "http://iiif.io/api/image/2/context.json",
      "@id": `http://localhost:3000/iiif/${imageId}`,
      "protocal": "http://iiif.io/api/image",
      width: meta.width,
      height: meta.height,
      profile: [ "http://iiif.io/api/image/2/level2.json" ]
    }
    res.send(info)

  } catch (ex) {
    console.error(ex)
  }
}
