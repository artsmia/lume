import Sequelize from 'sequelize'
import db from '../connect'

const clip = db.define('clip', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  coordinates: Sequelize.STRING,
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
  index: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  }
}, {
  freezeTableName: true
})


export default clip
