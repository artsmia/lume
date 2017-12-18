import Sequelize from 'sequelize'
import db from '../db/connect'
import contentTypes from './types'

import picture from './picture/Model'
import movie from './movie/Model'
import comparison from './comparison/Model'

const Content = db.define('content', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  type: {
    type: Sequelize.ENUM,
    values: contentTypes
  },
  index: {
    type: Sequelize.INTEGER,
  },
  title: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.TEXT,
  },
  ...picture,
  ...movie,
  ...comparison,
}, {
  freezeTableName: true
})


export default Content
