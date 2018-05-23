import Sequelize from 'sequelize'
import db from '../connect'

const User_Organization = db.define(
  'user_organization',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: Sequelize.STRING
    },
    // organizationId:{
    //     type: Sequelize.UUID,
    //     references: {
    //       model: 'organization',
    //       key: 'id'
    //     },
    //     onDelete: 'CASCADE',
    //     onUpdate: 'CASCADE'
    //   },
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
