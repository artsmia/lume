import Sequelize from 'sequelize'
import db from '../connect'

const Comparison = db.define('comparison', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
}, {
  freezeTableName: true
})


export default Comparison
