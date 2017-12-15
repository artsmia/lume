import Sequelize from 'sequelize'
import db from '../connect'

import contentTypes from '../../contents/types'

const Content = db.define('content', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.TEXT,
  },
  type: {
    type: Sequelize.ENUM,
    values: contentTypes
  },
  index: {
    type: Sequelize.INTEGER,
  },
}, {
  freezeTableName: true
})


export default Content
