import Sequelize from 'sequelize'
import db from '../connect'

const Obj = db.define(
  'obj',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    localId: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    },
    primaryMediaType: {
      type: Sequelize.ENUM('image', 'video'),
      defaultValue: 'image'
    },
    attribution: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    },
    date: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    },
    culture: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    },
    accessionNumber: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    },
    medium: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: ''
    },
    dimensions: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    },
    currentLocation: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    },
    creditLine: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: ''
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: ''
    },
    pullFromCustomApi: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
    // organizationId:{
    //     type: Sequelize.UUID,
    //     references: {
    //       model: 'organization',
    //       key: 'id'
    //     },
    //     onDelete: 'CASCADE',
    //     onUpdate: 'CASCADE'
    //   },
    // primaryImageId: {
    //   type: Sequelize.UUID,
    //   references: {
    //     model: 'image',
    //     key: 'id'
    //   },
    //   allowNull: true,
    //   onDelete: 'SET NULL',
    //   onUpdate: 'CASCADE'
    // },
    // primaryMediaId: {
    //   type: Sequelize.UUID,
    //   references: {
    //     model: 'media',
    //     key: 'id'
    //   },
    //   allowNull: true,
    //   onDelete: 'SET NULL',
    //   onUpdate: 'CASCADE'
    // }
  },
  {
    freezeTableName: true
  }
)

export default Obj
