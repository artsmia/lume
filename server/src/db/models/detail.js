import Sequelize from 'sequelize'
import db from '../connect'

const zoomer = db.define('detail', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
}, {
  freezeTableName: true
})


export default zoomer
