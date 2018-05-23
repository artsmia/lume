import Sequelize from 'sequelize'
import db from '../connect'

const Organization = db.define(
  'organization',
  {
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
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    },
    newUsersRequireApproval: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
    customObjApiEnabled: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    customObjApiEndpoint: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    },
    objSearchEndpoint: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    },
    customImageApiEnabled: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    customImageEndpoint: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    },
    imageSearchEndpoint: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    },
    customAnalyticsEnabled: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    customAnalyticsId: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    },
    locationEnabled: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
    // orgImageId: {
    //   type: Sequelize.UUID,
    //   allowNull: true,
    //   references: {
    //     model: 'image',
    //     key: 'id'
    //   },
    //   onDelete: 'SET NULL',
    //   onUpdate: 'CASCADE',
    //   constraints: false,
    // },
    // locationImageId: {
    //   type: Sequelize.UUID,
    //   allowNull: true,
    //   references: {
    //     model: 'image',
    //     key: 'id'
    //   },
    //   onDelete: 'SET NULL',
    //   onUpdate: 'CASCADE',
    //   constraints: false,
    //
    // }
  },
  {
    freezeTableName: true
  }
)

export default Organization
