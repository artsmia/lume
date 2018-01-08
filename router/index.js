require('dotenv').config()
const express = require('express')
const next = require('next')
const fetch = require('isomorphic-unfetch')
const session = require('express-session')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const cookieParser = require('cookie-parser')

const passport = require('../auth/passport')

// console.log(`
//   Starting Server:
//     env: ${process.env.NODE_ENV},
//     api: ${process.env.API_CONFIG}
// `)

app.prepare().then(() => {

  const server = express()


  server.use(
    cookieParser(),
    passport.initialize(),
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false
    }),
    passport.session()
  )

  server.get(
    '/login',
    passport.authenticate('auth0', {
      clientID: process.env.AUTH0_CLIENT_ID,
      domain: process.env.AUTH0_DOMAIN,
      redirectUri: `${process.env.NEXT_URL}/callback`,
      audience: `https://${process.env.AUTH0_DOMAIN}/userinfo`,
      responseType: 'code',
      scope: 'openid'
    }),
    (req, res) => {
    },
  )

  server.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })

  server.get(
    '/callback',
    passport.authenticate('auth0', {
      failureRedirect: '/'
    }),
    (req, res) => {

      res.redirect('/auth')

    }
  )

  server.get('/auth', (req, res) => {
    const page = '/auth'
    app.render(req, res, page)
  })

  server.get('/new', (req, res) => {
    const page = '/cms/orgManager'
    app.render(req, res, page)
  })


  server.get('/:subdomain/story/:storyId', (req, res) => {
    const page = '/lume/story'
    const {subdomain, storyId} = req.params
    const params = {
        subdomain,
        storyId
    }
    app.render(req, res, page, params)
  })


  server.get('/:subdomain/cms', (req, res) => {
    const page = '/cms'
    const {subdomain} = req.params
    const params = {
        subdomain,
    }
    app.render(req, res, page, params)
  })

  server.get('/:subdomain', (req, res) => {
    const page = '/lume'
    const {subdomain} = req.params
    const params = {
        subdomain,
    }
    app.render(req, res, page, params)
  })

  server.get('/:subdomain/cms/:storyId', (req, res) => {
    const page = '/cms/edit'
    const {subdomain, storyId} = req.params
    const params = {
        subdomain,
        storyId,
    }
    app.render(req, res, page, params)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log(`Ready on ${process.env.NEXT_URL}`)
  })


})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
