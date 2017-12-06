import Sequelize from 'sequelize'
import db from '../connect'

const obj = db.define('obj', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  localId: {
    type: Sequelize.STRING
  },
  title: {
    type: Sequelize.STRING,
    defaultValue: "New Object Story"
  },
  primaryMediaType: {
    type: Sequelize.ENUM("image", "video")
  },
  attribution: Sequelize.STRING,
  date: Sequelize.STRING,
  culture: Sequelize.STRING,
  accessionNumber: Sequelize.STRING,
  medium: Sequelize.STRING,
  dimensions: Sequelize.STRING,
  currentLocation: Sequelize.STRING,
  creditLine: Sequelize.TEXT,
  text: Sequelize.TEXT,
  visibility: {
    type: Sequelize.ENUM,
    values: ['published', 'draft']
  },
  pullFromCustomApi: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
}, {
  freezeTableName: true
})


export default obj
