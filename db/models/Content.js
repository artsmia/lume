import Sequelize from 'sequelize'
import db from '../connect'

const Content = db.define('content', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.TEXT,
  },
  geometry: {
    type: Sequelize.GEOMETRY("POLYGON")
  },
  type: {
    type: Sequelize.ENUM,
    values: ['comparison', 'picture', 'movie', 'detail','obj']
  },
  videoUrl: {
    type: Sequelize.STRING,
  },
  index: {
    type: Sequelize.INTEGER,
  },
}, {
  freezeTableName: true
})


export default Content
