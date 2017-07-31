import Sequelize from 'sequelize'
import db from '../connect'

const book = db.define('book', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  miaId:Sequelize.STRING,
  title: Sequelize.STRING,
}, {
  freezeTableName: true
})


export default book
