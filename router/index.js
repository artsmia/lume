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

console.log(`
  Starting Server:
    env: ${process.env.NODE_ENV},
    api: ${process.env.API_CONFIG}
`)

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
    async (req, res) => {
      try {
        let organizations = await getUserOrganizations(req.session.passport.user.id)

        if (organizations.length > 0) {
          res.redirect(`/${organizations[0].subdomain}/cms`)
        } else {
          res.redirect('/new')
        }

      } catch (ex) {
        console.error(ex)
      }
    }
  )

  server.get('/new', (req, res) => {
    const page = '/cms/orgManager'
    app.render(req, res, page)
  })

  server.get('/:subdomain/cms', (req, res) => {
    const page = '/cms'
    const {subdomain} = req.params

    let user = getUser(req)
    const queryParams = {
        subdomain,
        user
    }
    app.render(req, res, page, queryParams)
  })

  server.get('/:subdomain/cms/:storyId', (req, res) => {
    const page = '/cms/edit'
    const {subdomain, storyId} = req.params
    const queryParams = {
        subdomain,
        storyId,
        user: getUser(req)
    }
    app.render(req, res, page, queryParams)
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

function getUser(req){
  if (process.env.AUTH_STRATEGY === 'local') {
    let user = {id: 'local'}
    return user
  } else {
    return req.session.passport.user
  }
}

async function getUserOrganizations(id){
  try {
    const response = await fetch(process.env.API_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        query: `{
          user (id:"${id}") {
            id
            email
            organizations {
              id
              subdomain
              role
            }
          }
        }`
      })
    })

    let json = await response.json()

    return json.data.user.organizations
  } catch (ex) {
    console.error(ex)
  }
}
