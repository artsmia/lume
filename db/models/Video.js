import Sequelize from 'sequelize'
import db from '../connect'

const Video = db.define('video', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.TEXT
  },
  url: {
    type: Sequelize.STRING,
  },
}, {
  freezeTableName: true
})


export default Video
