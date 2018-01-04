import "babel-polyfill"
import 'dotenv/config'
import db from '../db/connect'
import {createAssociations} from '../db/associations'
import rimraf from 'rimraf'
import mkdirp from 'mkdirp'
import path from 'path'

async function reinitialize(){
  try {

    await db.query("SET foreign_key_checks = 0;")

    await db.sync({force: true})

    await db.query("SET foreign_key_checks = 1;")

    await createAssociations()

    console.log("done?")
  } catch (ex) {
    console.error(ex)
  }
}

reinitialize()

rimraf('localFileStorage', (err) => {
  mkdirp('localFileStorage', (err) => {
    process.exit(1)
  })
})
