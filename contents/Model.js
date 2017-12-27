import Sequelize from 'sequelize'
import db from '../db/connect'
import contentTypes from './types'


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
  geometry: {
    type: Sequelize.GEOMETRY,
  },
  videoUrl: {
    type: Sequelize.STRING,
    defaultValue: ""
  }
}, {
  freezeTableName: true
})


export default Content
