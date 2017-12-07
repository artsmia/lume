import Sequelize from 'sequelize'
import db from '../connect'

const Story = db.define('story', {
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
  template: {
    type: Sequelize.ENUM('scroller', 'slideshow'),
  },
  visibility: {
    type: Sequelize.ENUM,
    values: ['published', 'draft']
  },
}, {
  freezeTableName: true,
})


export default Story
