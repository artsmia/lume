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
  metadata: {
    type: Sequelize.STRING,
  },
  host: {
    type: Sequelize.ENUM,
    values: ['s3','gdrive']
  },
  s3Bucket: Sequelize.STRING,
  gdriveId: Sequelize.STRING
}, {
  freezeTableName: true
})


export default image
