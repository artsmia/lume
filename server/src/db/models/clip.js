import Sequelize from 'sequelize'
import db from '../connect'

const clip = db.define('clip', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  geometry: {
    type: Sequelize.GEOMETRY("POLYGON")
  },
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
  index: {
    type: Sequelize.INTEGER,
  }
}, {
  freezeTableName: true
})


export default clip
