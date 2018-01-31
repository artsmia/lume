import Sequelize from 'sequelize'
import db from '../connect'

const Content = db.define('content', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  type: {
    type: Sequelize.ENUM,
    values: [
      "comparison",
      "detail",
      "movie",
      "obj",
      "picture"
    ],
    allowNull: false,
    defaultValue: "picture"
  },
  index: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
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
  geometry: {
    type: Sequelize.GEOMETRY,
  },
  videoUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: ""
  },
}, {
  freezeTableName: true
})


export default Content
