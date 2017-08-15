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
    type: Sequelize.ENUM("ADMIN", "BASIC", "PENDING"),
    defaultValue: "PENDING"
  }
},{
  freezeTableName: true
})

export default userOrganization
