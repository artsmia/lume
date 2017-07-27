import Sequelize from 'sequelize'
import db from '../connect'

const group = db.define('group', {
  title: Sequelize.STRING,
}, {
  freezeTableName: true
})


export default group
