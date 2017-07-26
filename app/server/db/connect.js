const Sequelize = require('sequelize')

const {
  db_host: host,
  db_port: port,
  db_username: username,
  db_password: password,
  db_database: database,
  db_dialect: dialect
} = process.env

const db = new Sequelize({
  host,
  port,
  username,
  password,
  database,
  dialect
})

module.exports = db
