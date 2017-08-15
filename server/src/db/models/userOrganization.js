import Sequelize from 'sequelize'
import db from '../connect'

const userOrganization = db.define("user_organization", {
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
    type: Sequelize.STRING,
    // values: ['admin', 'basic', 'pending'],
    // defaultValue: "pending"
  }
},{
  freezeTableName: true
})

export default userOrganization
