import jwt from 'jsonwebtoken'

export async function authMiddleware(req, res, next) {
  try {
    if (req.headers.authorization) {
      const IDToken = req.headers.authorization.split('Bearer ')[1]
      const decoded = await verify(IDToken)
      req.userId = decoded.sub
    }
    next()
  } catch (ex) {
    console.error("authMiddleware ex", ex)
    next()
  }
}

function verify(IDToken){
  return new Promise( (resolve, reject) => {
    jwt.verify(
      IDToken,
      process.env.auth0Secret, {
        algorithms: ["HS256"]
      }, (ex, decoded) => {
        if (ex) {
          reject(ex)
        }
        resolve(decoded)
      }
    )
  })
}
