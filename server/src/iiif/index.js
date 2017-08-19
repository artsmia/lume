import info from './info'
import sharp from 'sharp'
import fetch from 'node-fetch'

export default async function(req, res, next){
  try {
    const {
      identifier,
      region,
      size,
      rotation,
      quality,
      format
    } = req.params

    const [
      orgId,
      imageId
    ] = identifier.split("|")

    const response = await fetch(
      `https://s3.amazonaws.com/${orgId}/${imageId}`, {
      method: 'GET'
    })

    const buffer = await response.buffer()

    let image = sharp(buffer)

    let meta = await image.metadata()

    //Region

    switch (true) {
      case  (region === "full"): {

        break
      }
      case (region === "square"): {

        const shorterSide = (meta.width > meta.height) ? meta.height : meta.width

        image = await image.resize(shorterSide, shorterSide)

        break
      }
      case ( new RegExp(/pct:.+,.+,.+,/g).test(region) ): {

        let [,values] = region.split("pct:")
        let [
          left, top, width, height
        ] = values.split(",").map(region => parseInt(region, 10) * .01)

        left = Math.floor(left * meta.width)
        top = Math.floor(top * meta.height)
        width = Math.floor(width * meta.width)
        height = Math.floor(height * meta.height)

        image = await image.extract({
          left,
          top,
          width,
          height
        })


        break
      }
      case (new RegExp(/.+,.+,.+,/g).test(region)): {
        const [
          left, top, width, height
        ] = region.split(",").map(region => parseInt(region, 10))

        image = await image.extract({
          left,
          top,
          width,
          height
        })
        break
      }
    }

    //size
    switch (true) {
      case (size === "full"):
      case (size === "max"): {

        break
      }
      case (new RegExp(/\d+,\d+/g).test(size)): {

        let [,w,h] = new RegExp(/(\d+),(\d+)/g)
                      .exec(size)
                      .map( value => Math.floor( parseInt( value, 10)))


        image = await image.resize(w, h).ignoreAspectRatio()
        break
      }
      case (new RegExp(/\d+,/g).test(size)): {

        let [,w] = new RegExp(/(\d+),/g).exec(size)

        w = parseInt(w, 10)

        image = await image.resize(w,null)

        break
      }
      case (new RegExp(/,\d+/g).test(size)): {

        let [,h] = new RegExp(/,(\d+)/g).exec(size)

        h = parseInt(h, 10)

        image = await image.resize(null, h)

        break
      }
      case (new RegExp(/pct:.+/g).test(size)): {

        let [,n] = new RegExp(/pct:(.+)/g).exec(size)


        n = parseInt(n, 10) / 100

        let w = Math.floor(meta.width * n)


        image = await image.resize(w)

        break
      }

    }


    //rotation

    switch (true) {
      case rotation.includes('!'): {
        image = await image.flip()
        let [,angle] = new RegExp(/\!(\d+)/g).exec(rotation)
        angle = parseInt(angle, 10)
        image = await image.rotate(angle)
        break
      }
      default: {
        let angle = parseInt(rotation, 10)
        image = await image.rotate(angle)
        break
      }
    }

    //quality

    switch (true) {
      case (quality === 'color'): {
        break
      }
      case (quality === 'gray'): {
        image = await image.grayscale()
        break
      }
      default: {

        break
      }
    }

    //format

    switch (true) {
      case (format === "jpg"): {
        image = await image.jpeg()
        res.type('jpeg')
        break
      }
      case (format === "tif"): {
        image = await image.tiff()
        res.type('tif')
        break
      }
      default:
      case (format === "png"): {
        image = await image.png()
        res.type("png")
        break
      }
    }


    const final = await image.toBuffer("yourFile")

    res.send(final)


  } catch (ex) {
    console.error(ex)
  }
}

export {
  info
}
