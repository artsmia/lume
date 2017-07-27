import Sequelize from 'sequelize'
import db from '../connect'

const mapStory = db.define('mapStory', {
  coordinates: Sequelize.STRING,

}, {
  freezeTableName: true
})


export default mapStory
