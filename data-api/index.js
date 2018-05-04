import "babel-polyfill"
import "dotenv/config"

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
import s3Media from './media'

import verify from './auth/verify'
import createGithubIssue from './github/issue'
import apphook from './github/apphook'


import {ApolloEngine} from 'apollo-engine'


const engine = new ApolloEngine({
  apiKey: process.env.APOLLO_ENGINE_APIKEY
})



const upload = multer()

const server = express()

let port = process.env.PORT || 5000

server.set('port', port)

// let corsOptions = {
//   origin: [
//     /http:\/\/localhost:3000.*/,
//     /http:\/\/localhost:6000.*/,
//   ]
// }
server.use(
  cors(),
  //cors(corsOptions),
  bodyParser.json(),
)

server.use(
  "/media",
  upload.single("file"),
  s3Media
)

server.use(
  "/image",
  upload.single("file"),
  s3Image
)

server.use('/static', express.static('local-store'))

server.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/'
  })
)

server.use(
  '/apphook',
  apphook
)

server.use(
  '/bug',
  createGithubIssue
)

server.use(
  '/',
  (req, res, next) => {

    console.log("request")

    if(process.env.AUTH_STRATEGY === 'local'){

      req.userId = 'local'

      next()
    } else {
      verify(req, res, next)
    }

  },
  graphqlExpress((req, res) => {
    return {
      schema,
      context: req,
      tracing: true,
      cacheControl: true
    }
  }
))

// Call engine.listen instead of app.listen(port)
engine.listen({
  port: 5000,
  expressApp: server,
  graphqlPaths: ['/','/graphiql']
})


// server.listen(server.get('port'), ()=>{
//   console.log(`Server is running at port ${server.get('port')}`)
// })
