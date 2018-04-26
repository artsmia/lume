import fetch from 'isomorphic-unfetch'
import chalk from 'chalk'
import db from '../../data-api/db/connect'
import {createAssociations} from '../../data-api/db/associations'
import Organization from '../../data-api/db/models/Organization'
import User_Organization from '../../data-api/db/models/User_Organization'
import Story from '../../data-api/db/models/Story'
import Image from '../../data-api/db/models/Image'
import Obj from '../../data-api/db/models/Obj'
import Content from '../../data-api/db/models/Content'
import {Op} from 'sequelize'
import TurndownService from 'turndown'

const tdService = new TurndownService()

const log = (msg) => console.log(chalk.cyan(msg))


async function destroyMia(){
  try {

    await createAssociations()


    const Mia = await Organization.destroy({
      where: {
        subdomain: 'mia'
      },
    })


  } catch (ex) {
    console.error(ex)
  } finally {
    process.exit()
  }
}


destroyMia()
