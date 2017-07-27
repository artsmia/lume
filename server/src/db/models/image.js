import Sequelize from 'sequelize'
import db from '../connect'

const image = db.define('image', {
  url: Sequelize.STRING,
}, {
  freezeTableName: true
})


export default image
