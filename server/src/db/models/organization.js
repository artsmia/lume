import Sequelize from 'sequelize'
import db from '../connect'

const organization = db.define('organization', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  name: Sequelize.STRING,
  subdomain: {
    type: Sequelize.STRING,
    unique: true
  }
}, {
  freezeTableName: true
})


export default organization
