import Sequelize from 'sequelize'
import db from '../connect'

const image = db.define('image', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  url: Sequelize.STRING,
}, {
  freezeTableName: true
})


export default image
