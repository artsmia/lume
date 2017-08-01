import "babel-polyfill"
import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import {initalizeDb} from './db'
import graphqlHTTP from 'express-graphql'
import schema from './graphql'
import chalk from 'chalk'

const server = express()

let port = process.env.PORT || 5000

server.set('port', port)

server.use(
  cors(),
  bodyParser.json(),
  //log
)

function log(req,res, next) {
  console.log(chalk.cyan("New Request:"))
  console.log(req.body)
  next()
}


server.use('/', graphqlHTTP((req) =>{
  return {
    schema: schema,
    graphiql: true,
  }
}))

server.listen(server.get('port'), ()=>{
  console.log(`Server is running at port ${server.get('port')}`)
})


const {
  initDb
} = process.env

if (initDb === "true") {
  initalizeDb()
}
