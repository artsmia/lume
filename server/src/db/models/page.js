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
    defaultValue: "New Page"
  },
  text: Sequelize.TEXT,
  index: {
    type: Sequelize.INTEGER,
  },
  type: {
    type: Sequelize.ENUM('image', 'video', 'comparison'),
    defaultValue: 'image'
  },
  video: Sequelize.STRING,
}, {
  freezeTableName: true
})


export default page
