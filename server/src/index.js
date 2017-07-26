import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import db from './db'
import graphqlHTTP from 'express-graphql'
import schema from './graphql'

const server = express()

let port = process.env.PORT || 5000

server.set('port', port)

server.use(cors())

server.use(bodyParser.json())


server.use('/', graphqlHTTP((req) =>{
  return {
    schema: schema,
    graphiql: true,
  }
}))

server.listen(server.get('port'), ()=>{
  console.log(`Server is running at port ${server.get('port')}`)
})
