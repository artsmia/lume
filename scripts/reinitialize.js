import "babel-polyfill"
import 'dotenv/config'
import db from '../db/connect'
import {createAssociations} from '../db/associations'
import rimraf from 'rimraf'
import mkdirp from 'mkdirp'
import path from 'path'
import Organization from '../db/models/Organization'
import User_Organization from '../db/models/User_Organization'

async function reinitialize(){
  try {

    await db.query("SET foreign_key_checks = 0;")

    await createAssociations()

    await db.sync({force: true})

    await db.query("SET foreign_key_checks = 1;")

    let [organization] = await Organization.findOrCreate({
      where: {
        subdomain: 'local'
      },
      defaults: {
        name: "Local",
      }
    })


    await User_Organization.findOrCreate({
      where: {
        organizationId: organization.id,
        userId: "localuser"
      },
      defaults: {
        role: "admin"
      }
    })


    rimraf('localFileStorage', (err) => {
      mkdirp('localFileStorage', (err) => {
        process.exit(0)
      })
    })

    console.log("done?")
  } catch (ex) {
    console.error(ex)
  }
}

reinitialize()
