import Sequelize from 'sequelize'
import db from '../connect'

const Image = db.define('image', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
  localId: Sequelize.STRING,
  metadata: {
    type: Sequelize.JSON,
  },
  host: {
    type: Sequelize.ENUM,
    values: ['s3','gdrive', 'local']
  },
  s3Bucket: Sequelize.STRING,
}, {
  freezeTableName: true
})


export default Image
