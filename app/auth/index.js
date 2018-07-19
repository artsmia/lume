import router from 'next/router'
import fetch from 'isomorphic-unfetch'
import jwt from 'jsonwebtoken'
// import chalk from 'chalk'

export default class Auth {
  logging = true

  log = (text, data) => {
    if (process.env.NODE_ENV !== 'production' && this.logging) {
      console.log('Auth: ', text)
      if (data) {
        console.log(data)
      }
    }
  }

  ex = (text, ex) => {
    if (process.env.NODE_ENV !== 'production' && this.logging) {
      console.log('Auth: ', 'Exception!')
      console.log(text)
      console.error(ex)
    }
  }

  cmsRoles = ['admin', 'editor', 'contributor']

  constructor(ctx) {
    this.log('constructor')
    this.pathname = ctx.pathname
    this.query = ctx.query
    this.ctx = ctx
  }

  authenticate = async () => {
    try {
      this.log('authenticate')

      console.log(`Attempting to authenticate for
        pathname: ${this.pathname}
        subdomain: ${this.query.subdomain}
        `)

      await this.getUser()

      if (!this.user) {
        this.log('No User found.')
        this.log('Access Denied')
        this.authFail()
        return
      }

      if (!this.user.organizations) {
        this.log('User is not a member of any organizations.')
        this.log('Access Denied')
        this.authFail()
        return
      }

      this.organization = this.user.organizations.find(
        organization => organization.subdomain === this.query.subdomain
      )

      switch (true) {
        case process.env.AUTH_STRATEGY === 'local': {
          this.log('Using local auth strategy')
          break
        }
        case !this.user: {
          this.log('No User found.')
          this.log('Access Denied')
          this.authFail()
          break
        }
        case this.pathname === '/cms/organizations': {
          this.log('Access granted to organizations page.')
          break
        }
        case !this.organization: {
          this.log("Couldn't find permissions for this subdomain.")
          this.log('Access Denied')
          this.authFail()
          break
        }
        case this.organization.role === 'pending': {
          this.log("This user's role is pending.")
          this.pending()
          break
        }
        case this.pathname === '/cms/orgSettings' &&
          this.organization.role !== 'admin': {
          this.log('Must be an admin to access orgSettings.')
          this.authFail()
          break
        }
        case this.pathname === '/cms/orgSettings' &&
          this.organization.role === 'admin': {
          this.log('Admin access level found.')
          break
        }
        case this.cmsRoles.includes(this.organization.role): {
          this.log('Permissions found for organization.')
          break
        }

        default: {
          this.log('Default: Access denied.')
          this.authFail()
          break
        }
      }
    } catch (ex) {
      this.ex('authenticate', ex)
    }
  }

  getUser = async () => {
    try {
      this.log('getUser')
      console.info({
        SESSION_STORE: process.env.SESSION_STORE,
        redis: process.env.REDIS_URL
      })
      switch (true) {
        case process.env.AUTH_STRATEGY === 'local': {
          this.getUserLocal()
          break
        }
        case process.browser: {
          this.getUserBrowser()

          break
        }
        case !process.browser: {
          this.getUserServer()

          break
        }
        default: {
          break
        }
      }

      if (this.user) {
        console.log('user found')
        await this.fetchPermissions()
      } else {
        console.log('no user found')
      }
    } catch (ex) {
      this.ex('getUser', ex)
    }
  }

  getUserLocal = () => {
    try {
      this.log('getUserLocal')

      this.user = {
        id: 'local',
        idToken: 'local'
      }
    } catch (ex) {
      this.ex('getUserLocal', ex)
    }
  }

  getUserServer = () => {
    try {
      this.log('getUserServer')
      if (this.ctx.req.session) {
        if (this.ctx.req.session.passport) {
          const { id, idToken } = this.ctx.req.session.passport.user

          if (idToken) {
            if (this.isTokenExpired(idToken)) {
              this.authFail()
            }
          }

          if (id && idToken) {
            this.user = {
              id,
              idToken
            }
          }
        }
      }
    } catch (ex) {
      this.ex('getUserServer', ex)
    }
  }

  isTokenExpired = token => {
    try {
      let { exp } = jwt.decode(token)
      let now = Date.now()
      exp = exp * 1000
      this.log('token exp', exp)
      this.log('now', now)

      if (now > exp) {
        this.log('token is expired', now > exp)
        return true
      } else {
        return false
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  getUserBrowser = () => {
    try {
      this.log('getUserBrowser')
      let id = localStorage.getItem('userId')
      let idToken = localStorage.getItem('idToken')

      if (idToken) {
        if (this.isTokenExpired(idToken)) {
          this.authFail()
        }
      }

      if (id && idToken) {
        this.user = {
          id,
          idToken
        }
      }
    } catch (ex) {
      this.ex('getUserBrowser', ex)
    }
  }

  authFail = () => {
    try {
      this.log('authFail')
      if (!process.browser) {
        this.authFailServer()
      } else if (process.browser) {
        this.authFailBrowser()
      }
    } catch (ex) {
      this.ex('authFail', ex)
    }
  }

  authFailServer = () => {
    try {
      this.log('authFailServer')
      this.ctx.res.redirect('/logout')
    } catch (ex) {
      this.ex('authFailServer', ex)
    }
  }

  authFailBrowser = () => {
    try {
      this.log('authFailBrowser')
      router.replace('/logout')
    } catch (ex) {
      this.ex('authFailBrowser', ex)
    }
  }

  pending = () => {
    try {
      this.log('pending')
      if (!process.browser) {
        this.pendingServer()
      } else {
        this.pendingClient()
      }
    } catch (ex) {
      this.ex('pending', ex)
    }
  }

  pendingServer = () => {
    try {
      this.log('pendingServer')
      this.ctx.res.redirect(`/${this.query.subdomain}/pending`)
    } catch (ex) {
      this.ex('pendingServer', ex)
    }
  }

  pendingClient = () => {
    try {
      this.log('pendingClient')
      router.replace(`/${this.query.subdomain}/pending`)
    } catch (ex) {
      this.ex('pendingClient', ex)
    }
  }

  fetchPermissions = async () => {
    try {
      this.log('fetchPermissions')

      // if(process.env.AUTH_STRATEGY === 'local'){
      //   this.user = {
      //     id: 'local',
      //     organizations: [
      //       {
      //         id: 'local',
      //         name: 'local',
      //         role: 'admin',
      //         subdomain: 'local'
      //       }
      //     ]
      //   }
      //   return
      // }

      let response = await fetch(process.env.API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.user.idToken}`,
          'content-type': 'application/json',
          userid: this.user.id
        },
        body: JSON.stringify({
          query: `{
            authenticate {
              timestamp
              user {
                id
                email
                name {
                  given
                  family
                }
                picture
                organizations {
                  id
                  subdomain
                  role
                  name
                }
              }
            }
          }`
        })
      })

      let {
        data: {
          authenticate: { user }
        }
      } = await response.json()

      this.user = {
        ...user,
        idToken: this.user.idToken
      }
    } catch (ex) {
      this.ex('fetchPermissions', ex)
      this.authFail()
    }
  }
}
