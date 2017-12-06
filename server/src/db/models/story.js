import Sequelize from 'sequelize'
import db from '../connect'

const story = db.define('story', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  template: {
    type: Sequelize.ENUM('obj', 'thematic'),
  },
  visibility: {
    type: Sequelize.ENUM,
    values: ['published', 'draft']
  },
}, {
  freezeTableName: true
})


export default story
