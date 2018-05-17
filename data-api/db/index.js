import chalk from 'chalk'
import db from './connect'
import associations from './associations'
import initialValues from './initialValues'

// createAssociations()

db.sync().then(() => {
  initialValues()
})

export default db
