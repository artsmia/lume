import Sequelize from 'sequelize'
import db from '../connect'

const User_Organization = db.define("user_organization", {
  userId: {
    type: Sequelize.STRING,
  },
  organizationId: {
    type: Sequelize.UUID,
    references: {
      model: "organization",
      key: "id"
    }
  },
  role: {
    type: Sequelize.ENUM,
    values: ['admin', 'editor', 'contributor', 'pending'],
  }
},{
  freezeTableName: true
})

export default User_Organization
