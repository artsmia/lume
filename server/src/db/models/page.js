import Sequelize from 'sequelize'
import db from '../connect'

const page = db.define('page', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
  },
  text: Sequelize.TEXT,
  index: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  type: {
    type: Sequelize.ENUM('image', 'video', 'comparison'),
  },
  video: Sequelize.STRING,
}, {
  freezeTableName: true
})


export default page
