import chalk from 'chalk'
import db from './connect'
import {createAssociations} from './associations'

createAssociations()

db.sync()


export default db
