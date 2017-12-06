import 'dotenv/config'
import fetch from 'isomorphic-unfetch'
import chalk from 'chalk'
import db from '../connect'
import {createAssociations} from '../associations'
import Organization from '../models/Organization'
import Story from '../models/Story'


const log = (msg) => console.log(chalk.cyan(msg))

async function populate() {
  try {

    await createAssociations()

    log("...fetching legacy data")


    const response = await fetch("https://new.artsmia.org/crashpad/")
    const {
      objects,
    } = await response.json()

    log("...creating mia")

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

    log("...converting objects to scroll stories")

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
      await story.createObj({
        ...scroll,
        primaryMediaType: "image",
        pullFromCustomApi: true
      })
    }

    log("...converting objects to scroll stories")


    process.exit()

  } catch (ex) {
    console.error(ex)
    process.exit(1)
  }




}



populate()
