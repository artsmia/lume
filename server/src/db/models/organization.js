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
  },
  emailDomain: {
    type: Sequelize.STRING
  },
  newUsersRequireApproval: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
}, {
  freezeTableName: true
})


export default organization
