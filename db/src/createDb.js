import {config} from 'dotenv'
import Sequelize from 'sequelize'

config()

const {dbHost, dbPort, dbUsername, dbPassword} = process.env

const db = new Sequelize({
  host: dbHost,
  port: dbPort,
  username: dbUsername,
  password: dbPassword,
  dialect: 'postgres',
  database: dbUsername
})
