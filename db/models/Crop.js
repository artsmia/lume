import Sequelize from 'sequelize'
import db from '../connect'

const Crop = db.define('crop', {
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


export default Crop
