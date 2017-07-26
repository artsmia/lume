import Sequelize from 'sequelize'
import db from '../connect'

const organization = db.define('organization', {
  name: Sequelize.STRING,
}, {
  freezeTableName: true
})


export default organization
