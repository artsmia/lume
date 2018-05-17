import authenticate from '../graphql/resolvers/authenticate'
import jwt from 'jsonwebtoken'
import fs from 'fs'

const cert =
  process.env.NOW && process.env.AUTH_STRATEGY === 'auth0'
    ? Buffer.from(process.env.AUTH0_PEM, 'base64').toString()
    : fs.readFileSync('../config/auth0.pem')

export default async (req, res, next) => {
  try {
    if (req.headers.authorization && req.headers.userid) {
      let token = req.headers.authorization.split('Bearer ')[1]
      let result = jwt.verify(token, cert, {
        algorithms: ['RS256'],
        aud: process.env.AUTH0_CLIENT_ID,
        issuer: `https://${process.env.AUTH0_DOMAIN}/`,
        sub: req.headers.userid
      })
      req.verified = true
      req.userId = req.headers.userid
      req.authentication = await authenticate('', '', {
        userId: req.headers.userid
      })
    }
    next()
  } catch (ex) {
    console.log('verification failed')
    // console.error(ex)
    req.verified = false
    next()
  }
}
