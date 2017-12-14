const jwt = require('jsonwebtoken')

function verify(IDToken) {
  return new Promise( (resolve, reject) => {
    jwt.verify(
      IDToken,
      process.env.auth0Secret, {
      algorithms: ["HS256"]
    },(err, decoded) => {
      if (err) {
        reject(err)
      }
      resolve(decoded)
    })
  })
}

async function authMiddleware(req,res,next) {
  try {
    const {
      IDToken
    } = req.cookies
    if (
      IDToken
    ) {
      const decoded = await verify(IDToken)
      req.IDToken = IDToken
      req.userId = decoded.sub
    }
    next()
  } catch (ex) {
    next()
  }

}

module.exports = authMiddleware
