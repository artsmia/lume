import "babel-polyfill"
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import db from './db'
import schema from './graphql'
import chalk from 'chalk'
import {
  graphqlExpress,
  graphiqlExpress,
} from 'apollo-server-express'


const server = express()

let port = process.env.PORT || 5000

server.set('port', port)

server.use(
  cors(),
  bodyParser.json(),
)

server.use('/static', express.static('localFileStorage'))

server.use('/graphiql', graphiqlExpress({
  endpointURL: '/'
}))

server.use('/', graphqlExpress((req, res) => {
  return {
    schema,
    context: req
  }
}))

server.listen(server.get('port'), ()=>{
  console.log(`Server is running at port ${server.get('port')}`)
})
