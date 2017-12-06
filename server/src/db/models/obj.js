import Sequelize from 'sequelize'
import db from '../connect'

const Obj = db.define('obj', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  localId: {
    type: Sequelize.STRING
  },
  title: {
    type: Sequelize.STRING,
  },
  primaryMediaType: {
    type: Sequelize.ENUM("image", "video")
  },
  attribution: Sequelize.STRING,
  date: Sequelize.STRING,
  culture: Sequelize.STRING,
  accessionNumber: Sequelize.STRING,
  medium: Sequelize.STRING,
  dimensions: Sequelize.STRING,
  currentLocation: Sequelize.STRING,
  creditLine: Sequelize.TEXT,
  text: Sequelize.TEXT,
  pullFromCustomApi: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
}, {
  freezeTableName: true
})


export default Obj
