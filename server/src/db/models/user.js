import Sequelize from 'sequelize'
import db from '../connect'

const user = db.define('user', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  email: Sequelize.STRING,
  password: Sequelize.STRING,
}, {
  freezeTableName: true
})


export default user
