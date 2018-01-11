import Sequelize from 'sequelize'
import db from '../connect'

const Group = db.define('group', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  title: Sequelize.STRING,
  description: Sequelize.STRING,
}, {
  freezeTableName: true
})


export default Group
