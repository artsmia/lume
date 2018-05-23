import Sequelize from 'sequelize'
import db from '../connect'

const Story = db.define(
  'story',
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
    template: {
      type: Sequelize.ENUM,
      values: ['scroller', 'slider', 'original'],
      defaultValue: 'original'
    },
    visibility: {
      type: Sequelize.ENUM,
      values: ['published', 'draft'],
      defaultValue: 'draft'
    },
    creatorId: {
      type: Sequelize.UUID
    },
    localId: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    },
    slug: {
      type: Sequelize.STRING,
      allowNull: false
    }
    // organizationId:{
    //     type: Sequelize.UUID,
    //     references: {
    //       model: 'organization',
    //       key: 'id'
    //     },
    //     onDelete: 'CASCADE',
    //     onUpdate: 'CASCADE'
    //
    //   },
    // previewImageId:{
    //     type: Sequelize.UUID,
    //     references: {
    //       model: 'image',
    //       key: 'id'
    //     },
    //     allowNull: true,
    //     onDelete: 'SET NULL',
    //     onUpdate: 'CASCADE'
    //   }
  },
  {
    freezeTableName: true
  }
)

export default Story
