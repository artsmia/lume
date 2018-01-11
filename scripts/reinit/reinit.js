import "babel-polyfill"
import db from '../../data-api/db/connect'
import {createAssociations} from '../../data-api/db/associations'
import rimraf from 'rimraf'
import mkdirp from 'mkdirp'
import path from 'path'
import Organization from '../../data-api/db/models/Organization'
import User_Organization from '../../data-api/db/models/User_Organization'
import chalk from 'chalk'

const log = (msg) => console.log(chalk.cyan(msg))

async function reinitialize(){
  try {

    await createAssociations()

    await db.query("SET foreign_key_checks = 0;")

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


    rimraf('data-api/local-store', (err) => {
      mkdirp('data-api/local-store', (err) => {
        log("data reset!")
        process.exit(0)
      })
    })

  } catch (ex) {
    console.error(ex)
  } finally {
  }
}

reinitialize()
