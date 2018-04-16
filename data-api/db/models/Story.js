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
    allowNull: false,
    defaultValue: ""
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: ""
  },
  template: {
    type: Sequelize.ENUM,
    values: ['scroller', 'slider', 'original'],
    defaultValue: 'original',
  },
  visibility: {
    type: Sequelize.ENUM,
    values: ['published', 'draft'],
    defaultValue: 'draft'
  },
  creatorId: {
    type: Sequelize.UUID
  },
  localId: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: ""
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, {
  freezeTableName: true,
})


export default Story
