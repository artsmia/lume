import chalk from 'chalk'
import db from './connect'
import Sequelize from 'sequelize'
import {createAssociations} from './associations'

db.sync()
createAssociations()


export default db
