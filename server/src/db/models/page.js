import Sequelize from 'sequelize'
import db from '../connect'

const page = db.define('page', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  title: Sequelize.STRING,
  text: Sequelize.STRING,
  index: Sequelize.INTEGER,
}, {
  freezeTableName: true
})


export default page
