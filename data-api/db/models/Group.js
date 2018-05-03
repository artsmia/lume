import Sequelize from 'sequelize'
import db from '../connect'

const Group = db.define('group', {
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
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: ""
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: ""
  },
  imageId: {
    type: Sequelize.UUID,
    references: {
      model: "image",
      key: "id"
    },
  },
  categoryId: (process.env.DB_MODE !== 'sqlite') ? {
    type: Sequelize.UUID,
    references: {
      model: "category",
      key: "id"
    },
  } : {
    type: Sequelize.UUID
  },
}, {
  freezeTableName: true
})


export default Group
