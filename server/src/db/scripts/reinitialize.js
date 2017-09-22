import "babel-polyfill"
import 'dotenv/config'
import db from '../connect'
import {createAssociations} from '../associations'

async function reinitialize(){
  try {

    await createAssociations()

    await db.sync({force: true})

    console.log("done?")
    process.exit(0)
  } catch (ex) {
    console.error(ex)
  }
}

reinitialize()
