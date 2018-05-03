import Sequelize from 'sequelize'
import db from '../connect'

const Category = db.define('category', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: ""
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: ""
  },
  organizationId: (process.env.DB_MODE !== 'sqlite') ? {
    type: Sequelize.UUID,
    references: {
      model: "organization",
      key: "id"
    },
    onDelete: 'cascade'
  } : {
    type: Sequelize.UUID
  },
  imageId: (process.env.DB_MODE !== 'sqlite') ? {
    type: Sequelize.UUID,
    references: {
      model: "image",
      key: "id"
    },
  } : {
    type: Sequelize.UUID
  },
}, {
  freezeTableName: true
})


export default Category
