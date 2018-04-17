import uuid from 'uuid/v4'
import sharp from 'sharp'
import fs from 'fs'
import rimraf from 'rimraf'
import fetch from 'isomorphic-unfetch'
// import Organization from '../db/models/Organization'

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
        alt
      }
    } = req

    // const organization = await Organization.findOne({
    //   where: {
    //     subdomain
    //   }
    // })

    // let image = await organization.createImage({
    //   title,
    //   description
    // })

    console.log(subdomain, title, alt)

    let image = await addImageToOrg({
      subdomain,
      title,
      description: alt
    })


    const fileId = image.id


    let directory = `local-store/${fileId}`

    await sharp(buffer).png().tile({size: 512, layout: 'zoomify'}).toFile(directory)

    await sharp(buffer).toFile(`${directory}/original.jpeg`)

    await sharp(buffer).resize(100).toFile(`${directory}/s.jpeg`)

    await sharp(buffer).resize(400).toFile(`${directory}/m.jpeg`)

    return res.json({done: "woo"})


  } catch (ex) {
    console.log(ex)
  }
}



async function addImageToOrg({
  subdomain,
  title,
  description
}){
  try {
    let response = await fetch("http://localhost:5000/", {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        query: `mutation {
          createImage(
            organization: {
              subdomain: "${subdomain}"
            }
            title: "${title}"
            description: "${description}"
          ) {
            id
            title
            description
            organization {
              id
            }
          }
        }`
        // variables: {
        //   subdomain,
        //   title,
        //   description
        // }
      })
    })

    let {
      data: {
        createImage
      }
    } = await response.json()

    return createImage

  } catch (ex) {
    console.error(ex)
  }
}
