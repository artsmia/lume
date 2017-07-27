import Sequelize from 'sequelize'
import db from '../connect'

const clip = db.define('clip', {
  coordinates: Sequelize.STRING,
  title: Sequelize.STRING,
}, {
  freezeTableName: true
})


export default clip
