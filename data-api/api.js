// import "babel-polyfill"
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
import multer from 'multer'
import s3Image from './image'
// import localImage from './image/offline'

const upload = multer()


const server = express()

let port = process.env.PORT || 5000

server.set('port', port)

server.use(
  cors(),
  bodyParser.json(),
)

// let imageRoute = (process.env.FILE_STORAGE === 'local') ? localImage : s3Image

server.use(
  "/image",
  upload.single("file"),
  s3Image
)

server.use('/static', express.static('local-store'))

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
