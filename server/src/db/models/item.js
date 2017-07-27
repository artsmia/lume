import Sequelize from 'sequelize'
import db from '../connect'

const item = db.define('item', {
  title: Sequelize.STRING,
  medium: Sequelize.STRING,
  artist: Sequelize.STRING,
  dated: Sequelize.STRING,
  accessionNumber: Sequelize.STRING,
  galleryLocation: Sequelize.STRING,
  creditLine: Sequelize.STRING,
  text: Sequelize.STRING,
  type: Sequelize.ENUM("BASIC", "MIA"),
}, {
  freezeTableName: true
})


export default item
