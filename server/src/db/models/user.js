import Sequelize from 'sequelize'
import db from '../connect'

const user = db.define('user', {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
}, {
  freezeTableName: true
})


export default user
