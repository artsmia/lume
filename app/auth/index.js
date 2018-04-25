import router from 'next/router'
import fetch from 'isomorphic-unfetch'
import jwt from 'jsonwebtoken'
// import chalk from 'chalk'

export default class Auth {

  log = (text, data) => {
    if (process.env.NODE_ENV !== 'production'){
      console.log("Auth: ", text)
      if (data){
        console.log(data)
      }
    }
  }

  ex = (text, ex) => {
    if (process.env.NODE_ENV !== 'production'){
      console.log("Auth: ", 'Exception!')
      console.log(text)
      console.error(ex)
    }
  }

  cmsRoles = ['admin', 'editor', 'contributor']

  constructor(ctx){
    this.log("constructor")
    this.pathname = ctx.pathname
    this.query = ctx.query

    if (process.browser){
      this.env = 'browser'
    } else if (
      ctx.req
    ) {
      this.env = 'server'
      this.session = ctx.req.session
      this.res = ctx.res
    } else {
      console.log("not server or browser?")
      this.authFail()
    }

  }

  authenticate = async() => {
    try {
      this.log('authenticate')
      await this.getUser()


      this.organization = this.user.organizations.find(
        organization => organization.subdomain === this.query.subdomain
      )




      switch (true) {


        case (process.env.AUTH_STRATEGY === 'local'): {
          this.log("Using local auth strategy")
          break
        }
        case(this.pathname === '/cms/orgSettings' && this.organization.role !== 'admin'): {
          this.log('Settings page is only for admins.')
          this.authFail()
          break
        }
        case (!this.organization): {

          this.log("Couldn't find permissions for this subdomain.")
          this.authFail()
          break
        }
        case (this.organization.role === 'pending'): {
          this.log("This user's role is pending.")
          this.pending()
          break
        }
        case (this.cmsRoles.includes(this.organization.role)): {
          this.log("Access granted.")
          break
        }
        default: {
          this.log("Default: Access denied.")
          this.authFail()
          break
        }
      }

    } catch (ex) {
      this.ex("authenticate", ex)
    }
  }



  getUser = async () => {
    try {
      this.log('getUser')
      switch (true) {
        case (process.env.AUTH_STRATEGY === 'local'): {
          this.getUserLocal()
          break
        }
        case (this.env === 'browser'): {
          this.getUserBrowser()

          break
        }
        case (this.env === 'server'): {
          this.getUserServer()

          break
        }
        default: {

          break
        }
      }

      if(this.user){
        await this.fetchPermissions()
      }



    } catch (ex) {
      this.ex("getUser", ex)
    }
  }

  getUserLocal = () => {
    try {
      this.log('getUserLocal')

      this.user = {
        id: 'localuser',
        idToken: 'localuser'
      }
    } catch (ex) {
      this.ex("getUserLocal", ex)
    }
  }

  getUserServer = () => {
    try {
      this.log("getUserServer")
      if (this.session.passport){

        const {
          id,
          idToken
        } = this.session.passport.user

        if (idToken){
          if (this.isTokenExpired(idToken)){
            this.authFail()
          }
        }

        if (id && idToken){
          this.user = {
            id,
            idToken
          }
        }
      }



    } catch (ex) {
      this.ex('getUserServer', ex)
    }
  }


  isTokenExpired = (token) => {
    try {
      let {exp} = jwt.decode(token)
      let now = Date.now()
      exp = exp * 1000
      this.log("token exp", exp)
      this.log("now", now)

      if (now > exp){
        this.log('token is expired',(now > exp))
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

      if (idToken){
        if (this.isTokenExpired(idToken)){
          this.authFail()
        }
      }

      if (id && idToken){
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
      if(this.env === 'server'){
        this.authFailServer()
      } else {
        this.authFailBrowser()
      }
    } catch (ex) {
      this.ex('authFail', ex)
    }

  }

  authFailServer = () => {
    try {
      this.log("authFailServer")
      this.res.redirect('/logout')
    } catch (ex) {
      this.ex('authFailServer', ex)
    }

  }

  authFailBrowser = () => {
    try {
      this.log('authFailBrowser')
      router.replace('/logout')
    } catch (ex) {
      this.ex("authFailBrowser", ex)
    }
  }

  pending = () => {
    try {
      this.log('pending')
      if (this.env === 'server'){
        this.pendingServer()
      } else {
        this.pendingClient()
      }
    } catch (ex) {
      this.ex("pending", ex)
    }

  }

  pendingServer = () => {
    try {
      this.log('pendingServer')
      this.res.redirect(`/cms/${this.subdomain}/pending`)
    } catch (ex) {
      this.ex('pendingServer', ex)
    }
  }

  pendingClient = () => {
    try {
      this.log('pendingClient')
      router.replace(`/cms/${this.subdomain}/pending`)
    } catch (ex) {
      this.ex('pendingClient', ex)
    }
  }

  fetchPermissions = async () => {
    try {
      this.log('fetchPermissions')

      if(process.env.AUTH_STRATEGY === 'local'){
        this.authProfile = {
          user: {
            id: 'localuser'
          },
          permissions: [
            {
              organization: {
                subdomain: 'local'
              },
              role: 'admin'
            }
          ]
        }
        return
      }

      let response = await fetch(process.env.API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.user.idToken}`,
          'content-type': 'application/json',
          'userid': this.user.id
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
          authenticate: {
            user
          }
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
