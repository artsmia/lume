import "babel-polyfill"
import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import {initalizeDb} from './db'
import schema from './graphql'
import chalk from 'chalk'
import imageRoute from './images'
import multer from 'multer'
import {authMiddleware} from './auth'
import {
  graphqlExpress,
  graphiqlExpress,
} from 'graphql-server-express'

const upload = multer()

const server = express()

let port = process.env.PORT || 5000

server.set('port', port)

server.use(
  cors(),
  bodyParser.json(),
  authMiddleware,
)

server.use("/image", upload.single("file") , imageRoute)


server.use('/graphql', graphqlExpress({
  schema
}));

server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));


server.listen(server.get('port'), ()=>{
  console.log(`Server is running at port ${server.get('port')}`)
})


const {
  initDb
} = process.env

if (initDb === "true") {
  initalizeDb()
}
