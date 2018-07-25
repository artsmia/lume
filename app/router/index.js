if (process.env.NODE_ENV !== 'production') {
  require('dotenv/config')
}

const express = require('express')
const next = require('next')
const fetch = require('isomorphic-unfetch')
const session = require('express-session')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const chalk = require('chalk')

const passport =
  process.env.AUTH_STRATEGY !== 'local' ? require('./passport') : {}

let sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}

if (process.env.SESSION_STORE === 'redis') {
  const RedisStore = require('connect-redis')(session)
  const redisOptions = {
    url: process.env.REDIS_URL
  }

  console.log(process.env.REDIS_URL)

  let store = new RedisStore(redisOptions)
  Object.assign(sessionConfig, { store })
} else if (process.env.SESSION_STORE === 'mysql') {
  const MySQLStore = require('express-mysql-session')(session)
  const mysql = require('mysql')
  const connection = mysql.createConnection(process.env.DB_URL)
  let store = new MySQLStore({}, connection)
  Object.assign(sessionConfig, { store })
}

app
  .prepare()
  .then(() => {
    const server = express()

    if (process.env.AUTH_STRATEGY !== 'local') {
      server.use(
        passport.initialize(),
        session(sessionConfig),
        passport.session()
      )

      console.log(process.env.REDIS_URL)

      server.get(
        '/login',
        passport.authenticate('auth0', {
          clientID: process.env.AUTH0_CLIENT_ID,
          domain: process.env.AUTH0_DOMAIN,
          redirectUri: `${process.env.CMS_URL}`,
          audience: `https://${process.env.AUTH0_DOMAIN}/userinfo`,
          responseType: 'code',
          scope: 'openid'
        }),
        (req, res) => {}
      )

      server.get('/logout', (req, res) => {
        req.session.destroy()
        let page = '/logout'
        app.render(req, res, page)
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
    }

    server.get('/error', (req, res) => {
      const page = '/error'
      app.render(req, res, page)
    })

    server.get('/auth', (req, res) => {
      const page = '/auth'
      app.render(req, res, page)
    })

    server.get('/organizations', (req, res) => {
      const page = '/cms/organizations'
      app.render(req, res, page)
    })

    // server.get("/cms/:subdomain", async (req, res) => {
    //   try {
    //     const page = "/cms"
    //     const { subdomain } = req.params
    //     const params = {
    //       subdomain
    //     }
    //     app.render(req, res, page, params)
    //   } catch (ex) {
    //     console.error(ex)
    //   }
    // })

    server.get('/:subdomain/pending', async (req, res) => {
      try {
        const page = '/cms/pendingApproval'
        const { subdomain } = req.params
        const params = {
          subdomain
        }
        app.render(req, res, page, params)
      } catch (ex) {
        console.error(ex)
      }
    })

    server.get('/:subdomain/settings', (req, res) => {
      const page = '/cms/orgSettings'
      app.render(req, res, page, req.params)
    })

    // server.get("/cms/:subdomain/:storySlug", (req, res) => {
    //   const page = "/cms/edit"
    //   const { subdomain, storySlug } = req.params
    //   const params = {
    //     subdomain,
    //     storySlug
    //   }
    //   app.render(req, res, page, params)
    // })

    server.get('/:subdomain/group/:groupSlug', (req, res) => {
      const page = '/lume'
      const { subdomain, groupSlug } = req.params

      let params = {
        subdomain,
        groupSlug
      }
      app.render(req, res, page, params)
    })

    server.get('/:subdomain/:storySlug/print', (req, res) => {
      const page = req.subdomains.includes('cms') ? '/cms/edit' : '/lume/story'

      const { subdomain, storySlug } = req.params
      const params = {
        subdomain,
        storySlug,
        print: true,
        preview: true
      }
      app.render(req, res, page, params)
    })

    server.get('/:subdomain/:storySlug', (req, res) => {
      const page = req.subdomains.includes('cms') ? '/cms/edit' : '/lume/story'

      const { subdomain, storySlug } = req.params
      const params = {
        subdomain,
        storySlug
      }
      app.render(req, res, page, params)
    })

    server.get('/:subdomain/:storySlug/preview', (req, res) => {
      const page = '/cms/edit'
      const { subdomain, storySlug } = req.params
      const params = {
        subdomain,
        storySlug,
        preview: true
      }
      app.render(req, res, page, params)
    })

    server.get('/:subdomain/:storySlug/:state0', (req, res) => {
      const page = '/lume/story'
      const { subdomain, storySlug, state0 } = req.params
      const params = {
        subdomain,
        storySlug,
        state0
      }
      app.render(req, res, page, params)
    })

    server.get('/:subdomain/:storySlug/:state0/:state1', (req, res) => {
      const page = '/lume/story'
      const { subdomain, storySlug, state0, state1 } = req.params
      const params = {
        subdomain,
        storySlug,
        state0,
        state1
      }
      app.render(req, res, page, params)
    })

    server.get('/:subdomain', (req, res) => {
      const page = req.subdomains.includes('cms') ? '/cms' : '/lume'
      let params = {
        ...req.params,
        ...req.query
      }
      //req.url = `/${req.params.subdomain}`
      app.render(req, res, page, params)
    })

    server.get('/', (req, res) => {
      if (req.subdomains.includes('cms')) {
        res.redirect('/login')
      }
      const page = '/lume/splash'
      let params = {
        ...req.params,
        ...req.query
      }
      //req.url = `/${req.params.subdomain}`
      app.render(req, res, page, params)
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(process.env.CLIENT_PORT, err => {
      console.log(
        chalk.cyan(`
CMS is running at: ${process.env.CMS_URL}
Lume is running at: ${process.env.LUME_URL}
`)
      )
      if (err) throw err
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
