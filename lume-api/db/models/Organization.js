import Sequelize from 'sequelize'
import db from '../connect'

const Organization = db.define('organization', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  name: Sequelize.STRING,
  subdomain: {
    type: Sequelize.STRING,
    unique: true,
    primaryKey: true
  },
  emailDomain: {
    type: Sequelize.STRING
  },
  newUsersRequireApproval: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  customObjApiEnabled: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  customObjApiEndpoint: {
    type: Sequelize.STRING
  },
  customImageApiEnabled: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  customImageEndpoint: {
    type: Sequelize.STRING
  },
}, {
  freezeTableName: true
})


export default Organization
