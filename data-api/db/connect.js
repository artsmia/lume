import Sequelize from 'sequelize'

let db

if (process.env.DB_MODE === 'local'){

  db = new Sequelize({
    dialect: 'sqlite',
    storage: 'liteDB.sqlite'
  })

}else {

  const {
    DB_HOST,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_DATABASE,
    DB_DIALECT
  } = process.env

  db = new Sequelize({
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    dialect: DB_DIALECT,
    logging: false,
    charset: 'utf8'
  })

}



export default db
