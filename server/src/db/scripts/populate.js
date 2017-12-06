import 'dotenv/config'
import fetch from 'isomorphic-unfetch'
import chalk from 'chalk'
import db from '../connect'
import {createAssociations} from '../associations'
import Organization from '../models/Organization'
import Story from '../models/Story'
import Image from '../models/Image'


const log = (msg) => console.log(chalk.cyan(msg))

async function populate() {
  try {

    await createAssociations()


    const response = await fetch("https://new.artsmia.org/crashpad/")
    const {
      objects,
      stories
    } = await response.json()


    const Mia = await Organization.create({
      subdomain: "mia",
      name: "Minneapolis Institute of Art",
      customObjApiEnabled: true,
      customObjApiEndpoint: "http://localhost:5000/mia/obj",
      customImageApiEnabled: true,
      customImageEndpoint: "http://localhost:5000/mia/image"
    })

    await Organization.create({
      subdomain: "mcn",
      name: "Museum Computer Network",
    })


    let scrollStories = Object.keys(objects).map( key => {
      let story = objects[key]
      return {
        ...story,
        id: undefined,
        title: story.title,
        template: "scroller",
        visibility: "published",
        localId: story.id,
      }
    })

    for (let scroll of scrollStories) {
      let story = await Mia.createStory(scroll)
      let [image] = await Image.findOrCreate({
        where: {
          localId: scroll.localId,
        }
      })

      await story.setPreviewImage(image)

      let index = 0

      let obj = await story.createObj({
        ...scroll,
        primaryMediaType: "image",
        pullFromCustomApi: true,
      }, {
        through: {
          index
        }
      })

      await obj.setPrimaryImage(image)

      for (let view of scroll.views) {

        index++

        let detail = await story.createDetail({}, {
          through: {
            index
          }
        })

        let [image] = await Image.findOrCreate({
          where: {
            localId: view.image
          }
        })

        await detail.setImage(image)

        let cropIndex = 0

        for (let annotation of view.annotations) {

          let geometry = {
            type: "Polygon",
            coordinates: [
              annotation.geoJSON.geometry.coordinates[0].map( coord => ([coord[1] * 256, coord[0] * 256]) )
            ]
          }

          await detail.createCrop({
            geometry,
            ...annotation,
            index
          })

          cropIndex++

        }
      }
    }


    let slideshowStories = Object.keys(stories).map( key => {
      let story = stories[key]
      return {
        ...story,
        id: undefined,
        template: "slideshow",
        visibility: "published",
        localId: story.id,
      }
    })



    for (let slide of slideshowStories) {


      let story = await Mia.createStory(slide)

      let index = 0

      for (let content of slide.pages) {
        switch (content.type) {
          case "video": {

            let movie = await story.createMovie({
              description: content.text,
            }, {
              through: {
                index
              }
            })

            await movie.createVideo({
              url: content.url
            })

            break
          }
          case "image": {

            let picture = await story.createPicture({
              description: content.text,
            }, {
              through: {
                index
              }
            })

            let [image] = await Image.findOrCreate({
              where: {
                localId: content.image,
              }
            })

            await picture.setImage(image)


            break
          }
          case "comparison": {

            let comparison = await story.createComparison({
              description: content.text,
            }, {
              through: {
                index
              }
            })

            let [image0] = await Image.findOrCreate({
              where: {
                localId: content.image,
              }
            })

            await comparison.setComparisonImage0(image0)

            let [image1] = await Image.findOrCreate({
              where: {
                localId: content.imageB,
              }
            })

            await comparison.setComparisonImage1(image1)

            break
          }
          default: {
            break
          }
        }
        index++
      }


    }


    process.exit()

  } catch (ex) {
    console.error(ex)
    process.exit(1)
  }




}



populate()
