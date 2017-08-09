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
  }
})

export default userOrganization
