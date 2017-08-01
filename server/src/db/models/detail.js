import Sequelize from 'sequelize'
import db from '../connect'

const detail = db.define('detail', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },

}, {
  freezeTableName: true
})


export default detail
