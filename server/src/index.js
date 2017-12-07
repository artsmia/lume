import "babel-polyfill"
import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import db from './db'
import schema from './graphql'
import chalk from 'chalk'
import imageRoute from './images'
import multer from 'multer'
import {authMiddleware} from './auth'
import {
  graphqlExpress,
  graphiqlExpress,
} from 'apollo-server-express'
import iiif, {info} from './iiif'

import miaEndpoints from './miaEndpoints'


console.log(`
  Starting Server:
    env: ${process.env.NODE_ENV},
    database: ${process.env.DATABASE}
`)


const upload = multer()

const server = express()

let port = process.env.PORT || 5000

server.set('port', port)

server.use(
  cors(),
  bodyParser.json(),
  authMiddleware,
)


server.use('/mia/:type', miaEndpoints)


server.use("/image", upload.single("file") , imageRoute)


server.use('/graphiql', graphiqlExpress({
  endpointURL: '/'
}))

server.use('/iiif/:identifier/info.json', info)

server.use('/iiif/:identifier/:region/:size/:rotation/:quality.:format', iiif)

server.use('/', graphqlExpress((req, res) => {
  return {
    schema,
    context: req
  }
}))




server.listen(server.get('port'), ()=>{
  console.log(`Server is running at port ${server.get('port')}`)
})


// const {
//   initDb
// } = process.env
//
// if (initDb === "true") {
//   initalizeDb()
// }
