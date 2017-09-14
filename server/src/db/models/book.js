import Sequelize from 'sequelize'
import db from '../connect'

const book = db.define('book', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    defaultValue: "New Book"
  },
}, {
  freezeTableName: true
})


export default book
