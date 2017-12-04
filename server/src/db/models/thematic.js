import Sequelize from 'sequelize'
import db from '../connect'

const thematic = db.define('thematic', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    defaultValue: "New Thematic Story"
  },
  visibility: {
    type: Sequelize.ENUM,
    values: ['published', 'draft']
  },
  localId: {
    type: Sequelize.STRING,
  }
}, {
  freezeTableName: true
})


export default thematic
