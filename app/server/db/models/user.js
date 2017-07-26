const Sequelize = require('sequelize')
const db = require('../connect')

const user = db.define('user', {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
}, {
  freezeTableName: true
})


module.exports = user
