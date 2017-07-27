import Sequelize from 'sequelize'
import db from '../connect'

const group = db.define('group', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  title: Sequelize.STRING,
  text: Sequelize.STRING,
}, {
  freezeTableName: true
})


export default group
