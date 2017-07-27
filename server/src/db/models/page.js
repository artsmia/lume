import Sequelize from 'sequelize'
import db from '../connect'

const page = db.define('page', {
  title: Sequelize.STRING,
  text: Sequelize.STRING,
  
}, {
  freezeTableName: true
})


export default page
