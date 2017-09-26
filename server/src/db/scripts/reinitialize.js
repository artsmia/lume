import "babel-polyfill"
import 'dotenv/config'
import db from '../connect'
import {createAssociations} from '../associations'

async function reinitialize(){
  try {

    await createAssociations()


    await db.query("SET foreign_key_checks = 0;")

    await db.sync({force: true})

    await db.query("SET foreign_key_checks = 1;")


    console.log("done?")
    process.exit(0)
  } catch (ex) {
    console.error(ex)
  }
}

reinitialize()
