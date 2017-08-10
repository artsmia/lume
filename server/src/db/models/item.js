import Sequelize from 'sequelize'
import db from '../connect'

const item = db.define('item', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  localId: {
    type: Sequelize.STRING
  },
  title: Sequelize.STRING,
  medium: Sequelize.STRING,
  artist: Sequelize.STRING,
  dated: Sequelize.STRING,
  accessionNumber: Sequelize.STRING,
  currentLocation: Sequelize.STRING,
  creditLine: Sequelize.TEXT,
  text: Sequelize.TEXT,
}, {
  freezeTableName: true
})


export default item
