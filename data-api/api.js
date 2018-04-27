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
import fetch from 'isomorphic-unfetch'
import jwt from 'jsonwebtoken'
import fs from 'fs'

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
  '/apphook',
  async (req, res, next) => {
    try {

      console.log("apphook", req.body)

    } catch (ex) {
      console.error(ex)
    }
  }
)

server.use(
  '/bug',
  async (req, res, next) => {
    try {

      let cert = fs.readFileSync('github.pem')


      let jwtToken = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 300,
          iss: process.env.GITHUB_ISS
        },
        cert,
        { algorithm: "RS256"}
      )

      let response = await fetch(`https://api.github.com/app/installations`, {
        method: 'GET',
        headers: {
          "Accept": 'application/vnd.github.machine-man-preview+json',
          Authorization: `Bearer ${jwtToken}`
        },
      })

      let json = await response.json()

      response = await fetch(`https://api.github.com/installations/143304/access_tokens`, {
        method: 'POST',
        headers: {
          "Accept": 'application/vnd.github.machine-man-preview+json',
          Authorization: `Bearer ${jwtToken}`
        },
      })

      json = await response.json()

      let accessToken = json.token

      response = await fetch(`https://api.github.com/repos/artsmia/lume/issues`, {
        method: 'POST',
        headers: {
          "Accept": 'application/vnd.github.machine-man-preview+json',
          Authorization: `token ${accessToken}`
        },
        body: JSON.stringify(req.body)
      })

      json = await response.json()

      res.json({success: true})

    } catch (ex) {
      console.error(ex)
    }
  }
)

server.use(
  '/',
  (req, res, next) => {

    console.log("request")

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
