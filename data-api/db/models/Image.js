import Sequelize from 'sequelize'
import db from '../connect'

const Image = db.define(
  'image',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: ''
    },
    localId: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    },
    format: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    },
    host: {
      type: Sequelize.ENUM,
      values: ['s3', 'mia', 'local'],
      defaultValue: 's3'
    },
    s3Bucket: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    },
    captionCredit: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: ''
    }
    // organizationId:{
    //     type: Sequelize.UUID,
    //     references: {
    //       model: 'organization',
    //       key: 'id'
    //     },
    //     onDelete: 'cascade',
    //     onUpdate: 'cascade'
    //
    //   }
  },
  {
    freezeTableName: true,
    hooks: {
      afterDestroy: async (image, options) => {
        try {
          console.log(image.id)
          console.log('this is where we make sure to delete the s3 files')
        } catch (ex) {
          console.error(ex)
        }
      }
    }
  }
)

export default Image
