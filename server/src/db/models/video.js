import Sequelize from 'sequelize'
import db from '../connect'

const video = db.define('video', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
  },
  url: {
    type: Sequelize.STRING,
  },
}, {
  freezeTableName: true
})


export default video
