import Sequelize from 'sequelize'

const {
  mysql_host: host,
  mysql_port: port,
  mysql_user: username,
  mysql_password: password,
  mysql_database: database,
  mysql_dialect: dialect
} = process.env

console.log(host)

const db = new Sequelize({
  host,
  port,
  username,
  password,
  database,
  dialect
})

export default db
