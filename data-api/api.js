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
import multer from 'multer'
import s3Image from './image'
import verify from './auth/verify'



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

// let imageRoute = (process.env.FILE_STORAGE === 'local') ? localImage : s3Image

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
  '/',
  (req, res, next) => {
    if(process.env.AUTH_STRATEGY === 'local'){
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
  }
))

server.listen(server.get('port'), ()=>{
  console.log(`Server is running at port ${server.get('port')}`)
})



// import {AuthenticationClient} from 'auth0'
// import passport from './auth/passport'
// import session from 'express-session'
// import MySQLStore from 'express-mysql-session'

// const RedisStore = require('connect-redis')(session)
// const redisOptions = {
//   url: process.env.REDIS_URL
// }

//
// MySQLStore(session)
//
// const storeOptions = {
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE
// }

// import localImage from './image/offline'

// const auth0 = new AuthenticationClient({
//   domain: process.env.AUTH0_DOMAIN,
//   clientId: process.env.AUTH_CLIENT_ID
// })
