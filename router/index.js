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
    const actualPage = '/cms/orgManager'
    app.render(req, res, actualPage)
  })


  server.get('/:subdomain/obj/:objId', (req, res) => {
    const actualPage = '/lume/obj'
    const {subdomain, objId} = req.params
    const queryParams = {
        subdomain,
        objId
    }
    app.render(req, res, actualPage, queryParams)
  })

  server.get('/:subdomain/thematic/:thematicId', (req, res) => {
    const actualPage = '/lume/thematic'
    const {subdomain, thematicId} = req.params
    const queryParams = {
        subdomain,
        thematicId
    }
    app.render(req, res, actualPage, queryParams)
  })

  server.get('/:subdomain/cms', (req, res) => {
    const actualPage = '/cms'
    const {subdomain} = req.params
    const queryParams = {
        subdomain,
    }
    app.render(req, res, actualPage, queryParams)
  })


  server.get('/:subdomain/cms/:storyId', (req, res) => {
    const actualPage = '/cms/edit'
    const {subdomain, storyId} = req.params
    const queryParams = {
        subdomain,
        storyId
    }
    app.render(req, res, actualPage, queryParams)
  })

  server.get('/:subdomain/cms/settings', (req, res) => {
    const actualPage = '/cms/org/settings'
    const {subdomain} = req.params
    const queryParams = {
        subdomain,
    }
    app.render(req, res, actualPage, queryParams)
  })



  server.get('/:subdomain', (req, res) => {
    const actualPage = '/lume'
    const {subdomain} = req.params
    const queryParams = {
        subdomain,
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
