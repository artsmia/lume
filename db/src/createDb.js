import {config} from 'dotenv'
import Sequelize from 'sequelize'
import sqlite3 from 'sqlite3'

// const sqlite = sqlite3.verbose()
//
// const db = new sqlite.Database('store/knight.sqlite', (ex)=> {
//   console.log(ex)
// })
//
//
// db.close()

// config()
//
// const {dbHost, dbPort, dbUsername, dbPassword} = process.env
//
const db = new Sequelize({
  database: 'knight',
  dialect: 'sqlite',
  storage: 'store/knight.sqlite'
})
// 
//
// const Item = db.define('item', {
//   json: Sequelize.JSON
// })


db.sync().then(()=>{
  console.log(db)
})

//console.log("db", db )
