import Sequelize from 'sequelize'
import db from '../db/connect'
import contentTypes from './types'
import movie from './movie/model'


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
  ...movie
}, {
  freezeTableName: true
})



export default Content
