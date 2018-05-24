import 'babel-polyfill'
import 'dotenv/config'

import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import db from './db'
import schema from './graphql'
import chalk from 'chalk'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import multer from 'multer'
import s3Image from './image'
import s3Media from './media'

import verify from './auth/verify'
import createGithubIssue from './github/issue'
import apphook from './github/apphook'

import { ApolloEngine } from 'apollo-engine'

const engine = process.env.APOLLO_ENGINE_APIKEY
  ? new ApolloEngine({
      apiKey: process.env.APOLLO_ENGINE_APIKEY
    })
  : {}

const upload = multer()

const server = express()

let port = process.env.API_PORT

server.set('port', port)

let corsOptions =
  process.env.NODE_ENV === 'production'
    ? {
        origin: [/https:\/\/*lume.space.*/]
      }
    : {
        origin: [/http:\/\/*.lume.space:3333.*/]
      }
server.use(cors(corsOptions), bodyParser.json())

server.use('/media', upload.single('file'), s3Media)

server.use('/image', upload.single('file'), s3Image)

server.use('/static', express.static('local-store'))

server.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/'
  })
)

server.use('/apphook', apphook)

server.use('/bug', createGithubIssue)

server.use(
  '/',
  (req, res, next) => {
    if (process.env.AUTH_STRATEGY === 'local') {
      req.userId = 'local'

      next()
    } else {
      verify(req, res, next)
    }
  },
  graphqlExpress((req, res) => {
    return {
      schema,
      context: req
    }
  })
)

if (process.env.APOLLO_ENGINE_APIKEY) {
  engine.listen({
    port,
    expressApp: server,
    graphqlPaths: ['/', '/graphiql']
  })
} else {
  server.listen(server.get('port'), () => {
    console.log(`Data api is running at ${process.env.API_URL}`)
  })
}
