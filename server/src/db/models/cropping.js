import Sequelize from 'sequelize'
import db from '../connect'

const cropping = db.define('cropping', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
  },
  index: {
    type: Sequelize.INTEGER
  },
  geometry: {
    type: Sequelize.GEOMETRY("POLYGON")
  },
  description: Sequelize.TEXT,
}, {
  freezeTableName: true
})


export default cropping
