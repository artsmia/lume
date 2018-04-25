import Sequelize from 'sequelize'

let db

if (process.env.DB_MODE === 'local'){

  db = new Sequelize({
    dialect: 'sqlite',
    storage: 'liteDB.sqlite',
    logging: false
  })

}else {


  db = new Sequelize(process.env.DB_URL, {
    logging: false,
    charset: 'utf8'
  })

}



export default db
