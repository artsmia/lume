import Sequelize from 'sequelize'
import db from '../connect'

const image = db.define('image', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  title: Sequelize.STRING,
  alt: Sequelize.STRING,
  localId: Sequelize.STRING,
  type: {
    type: Sequelize.ENUM,
    values: ['mia']
  },
  metadata: {
    type: Sequelize.STRING,
  }
}, {
  freezeTableName: true
})


export default image
