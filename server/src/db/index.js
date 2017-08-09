import chalk from 'chalk'
import db from './connect'
import {createAssociations} from './associations'
import populate from './populate'

createAssociations()

async function createTables() {
  try {

    await db.sync({force: true})

    console.log(chalk.cyan("DB Synced"))

  } catch (ex) {
    console.error("db sync error", ex)

  }
}

async function populateData(){
  try {
    await populate()
    console.log(chalk.cyan("DB populated"))

  } catch (ex) {
    console.error("db population error", ex)
  }
}

export async function initalizeDb(){
  try {

    await createTables()
    //await populateData()

    console.log(chalk.cyan("DB initialized"))

  } catch (ex) {
    console.error("db initialization error", ex)

  }
}


export default db
