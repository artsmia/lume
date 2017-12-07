import Sequelize from 'sequelize'
import db from '../connect'

const Picture = db.define('picture', {
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
}, {
  freezeTableName: true
})


export default Picture
