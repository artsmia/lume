import Sequelize from 'sequelize'


let host
let port
let username
let password
let database
let dialect
let storage

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
  case "local": {
    host = process.env.localDb_host
    port = process.env.localDb_port
    username = process.env.localDb_username
    password = process.env.localDb_password
    database = process.env.localDb_database
    dialect = process.env.localDb_dialect
    break
  }
  case "test": {
    host = '127.0.0.1'
    port = 3306
    username = 'root'
    password = ''
    database = 'test'
    dialect = 'mysql'
    break
  }
  default: {

    break
  }
}

if (process.env.TRAVIS) {
  host = '127.0.0.1'
  port = 3306
  username = 'root'
  password = ''
  database = 'test'
  dialect = 'mysql'
}


console.log(host, port, username, password, database, dialect)

const db = new Sequelize({
  host,
  port,
  username,
  password,
  database,
  dialect,
  logging: false,
  charset: 'utf8'
})


export default db
