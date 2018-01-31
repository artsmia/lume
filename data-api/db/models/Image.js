import Sequelize from 'sequelize'
import db from '../connect'

const Image = db.define('image', {
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
  localId: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: ""
  },
  // metadata: {
  //   type: Sequelize.JSON,
  // },
  host: {
    type: Sequelize.ENUM,
    values: ["s3","gdrive", "local"],
    defaultValue: "s3"
  },
  s3Bucket: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: ""
  },
  captionCredit: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: ""
  }
}, {
  freezeTableName: true
})


export default Image
