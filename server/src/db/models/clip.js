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
}, {
  freezeTableName: true
})


export default clip
