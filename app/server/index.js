require('dotenv').config()
const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const cookieParser = require('cookie-parser')
const authMiddleware = require('./auth')


console.log(`
  Starting Server:
    env: ${process.env.NODE_ENV},
    api: ${process.env.API_CONFIG}
`)

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


  server.get('/:orgSub/obj/:objId', (req, res) => {
    const actualPage = '/app/obj'
    const {orgSub, objId} = req.params
    const queryParams = {
        orgSub,
        objId
    }
    app.render(req, res, actualPage, queryParams)
  })

  server.get('/:orgSub/thematic/:thematicId', (req, res) => {
    const actualPage = '/app/thematic'
    const {orgSub, thematicId} = req.params
    const queryParams = {
        orgSub,
        thematicId
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

  server.get('/:orgSub/cms/objs', (req, res) => {
    const actualPage = '/cms/browse/objs'
    const {orgSub} = req.params
    const queryParams = {
        orgSub,
    }
    app.render(req, res, actualPage, queryParams)
  })

  server.get('/:orgSub/cms/thematics', (req, res) => {
    const actualPage = '/cms/browse/thematics'
    const {orgSub} = req.params
    const queryParams = {
        orgSub,
    }
    app.render(req, res, actualPage, queryParams)
  })


  server.get('/:orgSub/cms/obj/:objId', (req, res) => {
    const actualPage = '/cms/edit/obj'
    const {orgSub, objId} = req.params
    const queryParams = {
        orgSub,
        objId
    }
    app.render(req, res, actualPage, queryParams)
  })


  server.get('/:orgSub/cms/thematic/:thematicId', (req, res) => {
    const actualPage = '/cms/edit/thematic'
    const {orgSub, thematicId} = req.params
    const queryParams = {
        orgSub,
        thematicId
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
