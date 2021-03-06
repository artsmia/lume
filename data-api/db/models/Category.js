import Sequelize from 'sequelize'
import db from '../connect'

const Category = db.define(
  'category',
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
    // imageId:{
    //     type: Sequelize.UUID,
    //     allowNull: true,
    //     onDelete: 'SET NULL',
    //     onUpdate: 'CASCADE',
    //     references: {
    //       model: 'image',
    //       key: 'id'
    //     },
    //     constraints: false,
    //
    //   }
  },
  {
    freezeTableName: true
  }
)

export default Category
