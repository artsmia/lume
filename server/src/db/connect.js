import Sequelize from 'sequelize'


let host
let port
let username
let password
let database
let dialect

switch (process.env.DATABASE) {
  case "dev": {
    host = process.env.devDb_host
    port = process.env.devDb_port
    username = process.env.devDb_username
    password = process.env.devDb_password
    database = process.env.devDb_database
    dialect = process.env.devDb_dialect
    break
  }
  case "beta": {
    host = process.env.betaDb_host
    port = process.env.betaDb_port
    username = process.env.betaDb_username
    password = process.env.betaDb_password
    database = process.env.betaDb_database
    dialect = process.env.betaDb_dialect
    break
  }
  default: {

    break
  }
}

console.log(host, port, username, password, database, dialect)

const db = new Sequelize({
  host,
  port,
  username,
  password,
  database,
  dialect
})

export default db
