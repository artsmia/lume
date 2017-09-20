require('dotenv').config()
const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const cookieParser = require('cookie-parser')
const authMiddleware = require('./auth')

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


  server.get('/:orgSub/item/:itemId', (req, res) => {
    const actualPage = '/app/item'
    const {orgSub, itemId} = req.params
    const queryParams = {
        orgSub,
        itemId
    }
    app.render(req, res, actualPage, queryParams)
  })

  server.get('/:orgSub/book/:bookId', (req, res) => {
    const actualPage = '/app/book'
    const {orgSub, bookId} = req.params
    const queryParams = {
        orgSub,
        bookId
    }
    app.render(req, res, actualPage, queryParams)
  })

  server.get('/:orgSub/cms', (req, res) => {
    const actualPage = '/cms/org'
    const {orgSub} = req.params
    const queryParams = {
        orgSub,
    }
    app.render(req, res, actualPage, queryParams)
  })

  server.get('/:orgSub/cms/items', (req, res) => {
    const actualPage = '/cms/browse/items'
    const {orgSub} = req.params
    const queryParams = {
        orgSub,
    }
    app.render(req, res, actualPage, queryParams)
  })

  server.get('/:orgSub/cms/books', (req, res) => {
    const actualPage = '/cms/browse/books'
    const {orgSub} = req.params
    const queryParams = {
        orgSub,
    }
    app.render(req, res, actualPage, queryParams)
  })


  server.get('/:orgSub/cms/item/:itemId', (req, res) => {
    const actualPage = '/cms/edit/item'
    const {orgSub, itemId} = req.params
    const queryParams = {
        orgSub,
        itemId
    }
    app.render(req, res, actualPage, queryParams)
  })


  server.get('/:orgSub/cms/book/:bookId', (req, res) => {
    const actualPage = '/cms/edit/book'
    const {orgSub, bookId} = req.params
    const queryParams = {
        orgSub,
        bookId
    }
    app.render(req, res, actualPage, queryParams)
  })

  server.get('/:orgSub/cms/settings', (req, res) => {
    const actualPage = '/cms/org/settings'
    const {orgSub} = req.params
    const queryParams = {
        orgSub,
    }
    app.render(req, res, actualPage, queryParams)
  })



  server.get('/:orgSub', (req, res) => {
    const actualPage = '/app'
    const {orgSub} = req.params
    const queryParams = {
        orgSub,
    }
    app.render(req, res, actualPage, queryParams)
  })




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
