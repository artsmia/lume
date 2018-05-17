import Sequelize from 'sequelize'
import db from '../connect'

const User_Organization = db.define(
  'user_organization',
  {
    userId: {
      type: Sequelize.STRING
    },
    organizationId:
      process.env.DB_MODE !== 'sqlite'
        ? {
            type: Sequelize.UUID,
            references: {
              model: 'organization',
              key: 'id'
            },
            onDelete: 'cascade'
          }
        : {
            type: Sequelize.UUID
          },
    role: {
      type: Sequelize.ENUM,
      values: ['admin', 'editor', 'contributor', 'pending']
    }
  },
  {
    freezeTableName: true
  }
)

export default User_Organization
