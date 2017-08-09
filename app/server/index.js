require('dotenv').config()
const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

app.prepare().then(() => {
  const server = express()


  server.use(
    cookieParser(),
    authMiddleware
  )

  server.get('/auth', (req, res) => {
    const actualPage = '/auth'
    app.render(req, res, actualPage)
  })

  server.get('/new', (req, res) => {
    const actualPage = '/cms/org/joinOrCreate'
    app.render(req, res, actualPage)
  })

  server.get('/:orgSub/cms', (req, res) => {
    const actualPage = '/cms/org'
    const queryParams = {
        orgSub: req.orgSub,
    }
    app.render(req, res, actualPage, queryParams)
  })
  //
  // server.get('/cms/items', (req, res) => {
  //   const queryParams = {
  //     userId: req.userId,
  //     IDToken: req.IDToken
  //   }
  //   const actualPage = '/cms/browse/items'
  //
  //   app.render(req, res, actualPage, queryParams)
  //
  // })
  //
  // server.get('/cms/groups', (req, res) => {
  //   const actualPage = '/cms/browse/groups'
  //   app.render(req, res, actualPage)
  // })
  //
  // server.get('/cms/item/:itemId', (req, res) => {
  //   const actualPage = '/cms/edit/item'
  //   const {itemId} = req.params
  //   const queryParams = {
  //     itemId,
  //   }
  //   app.render(req, res, actualPage, queryParams)
  // })
  //
  //
  // server.get('/:itemId/:tab', (req, res) => {
  //   const actualPage = '/live/item'
  //   const {itemId, tab} = req.params
  //   const queryParams = {
  //     itemId,
  //     tab
  //   }
  //   app.render(req, res, actualPage, queryParams)
  // })
  //
  // server.get('/book/:bookId/:pageIndex', (req, res) => {
  //   const actualPage = '/live/book'
  //   const {bookId, pageIndex} = req.params
  //   const queryParams = {
  //     bookId,
  //     pageIndex
  //   }
  //   app.render(req, res, actualPage, queryParams)
  // })


  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})

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
