import Sequelize from 'sequelize'
import db from '../connect'

const zoomer = db.define('detail', {
}, {
  freezeTableName: true
})


export default zoomer
