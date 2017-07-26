const Sequelize = require('sequelize')
const db = require('../connect')

const organization = db.define('organization', {
  name: Sequelize.STRING,
}, {
  freezeTableName: true
})


module.exports = organization
