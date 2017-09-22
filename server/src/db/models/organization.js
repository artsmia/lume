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
  customItemApiEnabled: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  customItemApiEndpoint: {
    type: Sequelize.STRING
  },
  customImageApiEnabled: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  customImageThumbEndpoint: {
    type: Sequelize.STRING
  },
  customImageTileEndpoint: {
    type: Sequelize.STRING
  },
  customImageEndpoint: {
    type: Sequelize.STRING
  },
  customImageInfoEndpoint: {
    type: Sequelize.STRING    
  }
}, {
  freezeTableName: true
})


export default organization
