import Sequelize from 'sequelize'
import db from '../connect'

const user = db.define('user', {
  email: Sequelize.STRING,
  password: Sequelize.STRING,
}, {
  freezeTableName: true
})


export default user
