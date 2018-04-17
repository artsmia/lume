let deploymentEnv = process.env.DEPLOYMENT_ENV
const dotenv = require('dotenv')

dotenv.config({
  path: `.env.${deploymentEnv}`
})

const express = require('express')
const next = require('next')
const fetch = require('isomorphic-unfetch')
const session = require('express-session')

let store
if (process.env.REDIS_URL){
  const RedisStore = require('connect-redis')(session)
  const redisOptions = {
    url: process.env.REDIS_URL
  }
  store = new RedisStore(redisOptions)
} else {
  const MySQLStore = require('express-mysql-session')(session)
  const storeOptions = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  }
  store = MySQLStore(storeOptions)
}


const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const passport = require('./passport')

app.prepare().then(() => {

  const server = express()


  server.use(
    passport.initialize(),
    session({
      store,
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

  server.get(
    '/logout',
    (req, res) => {
      req.session.destroy()
      let page = '/logout'
      app.render(req, res, page)
    },
  )

  server.get(
    '/callback',
    passport.authenticate('auth0', {
      failureRedirect: '/'
    }),
    (req, res) => {

      res.redirect('/auth')

    }
  )

  server.get('/error', (req, res) => {
    const page = '/error'
    app.render(req, res, page)
  })

  server.get('/live', (req, res) => {
    const page = '/lume'
    let params = {
      ...req.query,
      subdomain: req.subdomains[0]
    }
    app.render(req, res, page, params)
  })

  server.get('/auth', (req, res) => {
    const page = '/auth'
    app.render(req, res, page)
  })

  server.get('/new', (req, res) => {
    const page = '/cms/orgManager'
    app.render(req, res, page)
  })


  server.get('/cms/:subdomain/pending',
    async (req, res) => {
      try {
        const page = '/cms/pendingApproval'
        const {subdomain} = req.params
        const params = {
          subdomain,
        }
        app.render(req, res, page, params)
      } catch (ex) {
        console.error(ex)
      }
    }
  )

  server.get('/cms/:subdomain',
    async (req, res) => {
      try {
        const page = '/cms'
        const {subdomain} = req.params
        const params = {
          subdomain,
        }
        app.render(req, res, page, params)
      } catch (ex) {
        console.error(ex)
      }
    }
  )
  server.get('/cms/:subdomain/settings',
    (req, res) => {
      const page = '/cms/orgSettings'
      app.render(req, res, page, req.params)
    }
  )

  server.get('/cms/:subdomain/:storySlug',
    (req, res) => {
      const page = '/cms/edit'
      const {subdomain, storySlug} = req.params
      const params = {
          subdomain,
          storySlug,
      }
      app.render(req, res, page, params)
    }
  )




  server.get('/:subdomain/:storySlug', (req, res) => {
    const page = '/lume/story'
    const {subdomain, storySlug} = req.params
    const params = {
        subdomain,
        storySlug,
    }
    app.render(req, res, page, params)
  })

  server.get('/:subdomain/:storySlug/:state0', (req, res) => {
    const page = '/lume/story'
    const {subdomain, storySlug, state0} = req.params
    const params = {
        subdomain,
        storySlug,
        state0
    }
    app.render(req, res, page, params)
  })

  server.get('/:subdomain/:storySlug/:state0/:state1', (req, res) => {
    const page = '/lume/story'
    const {subdomain, storySlug, state0, state1} = req.params
    const params = {
        subdomain,
        storySlug,
        state0,
        state1
    }
    app.render(req, res, page, params)
  })

  server.get('/:subdomain', (req, res) => {
    const page = '/lume'
    let params = {
      ...req.params,
      ...req.query
    }
    app.render(req, res, page, params)
  })



  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log(`Ready at ${process.env.NEXT_URL}`)
  })


})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
