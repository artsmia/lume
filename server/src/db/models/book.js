import Sequelize from 'sequelize'
import db from '../connect'

const book = db.define('book', {
  title: Sequelize.STRING,
}, {
  freezeTableName: true
})


export default book
