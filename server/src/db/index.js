import chalk from 'chalk'
import db from './connect'
import models from './models'
import populate from './populate'


async function createTables() {
  try {
    const synced = await db.sync({force: true})

    console.log(chalk.cyan("DB Synced"))

  } catch (ex) {
    console.error("db sync error", ex)

  }
}

async function populateData(){
  try {
    const populated = await populate()
    console.log(chalk.cyan("DB populated"))

  } catch (ex) {
    console.error("db population error", ex)
  }
}

export async function initalizeDb(){
  try {
    await createTables()
    await populateData()
    console.log(chalk.cyan("DB initialized"))

  } catch (ex) {
    console.error("db initialization error", ex)

  }
}


export default db
