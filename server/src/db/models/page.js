import Sequelize from 'sequelize'
import db from '../connect'

const page = db.define('page', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  text: Sequelize.TEXT,
  pageIndex: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  type: {
    type: Sequelize.STRING,
  },
  video: Sequelize.STRING,
}, {
  freezeTableName: true
})


export default page
