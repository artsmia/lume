import router from 'next/router'
import fetch from 'isomorphic-unfetch'

export default class Auth {

  cmsRoles = ['admin', 'editor', 'contributor']


  constructor(ctx){

    this.ctx = ctx

    if (process.browser){
      this.env = 'browser'
      this.subdomain = ctx.query.subdomain
    } else if (
      ctx.req
    ) {
      this.env = 'server'
      this.subdomain = ctx.req.params.subdomain

    } else {
      console.log("not server or browser?")
      this.authFail()
    }

  }

  authenticate = async() => {
    try {

      this.getUser()

      await this.fetchPermissions()

      this.permission = this.authProfile.permissions.find(
        ({organization}) => organization.subdomain === this.subdomain
      )

      switch (true) {
        case (!this.permission): {

          console.log("couldn't find permissions for this subdomain")
          this.authFail()
          break
        }
        case (this.permission.role === 'pending'): {
          console.log("role is pending")
          this.pending()
          break
        }
        case (this.cmsRoles.includes(this.permission.role)): {
          console.log("allowed")
          this.ctx = {}
          break
        }
        default: {
          console.log("authFail")
          this.authFail()
          break
        }
      }


    } catch (ex) {
      console.error(ex)
    }
  }



  getUser = () => {
    try {
      if (this.env === 'browser'){
        this.getUserBrowser()
      } else {
        this.getUserServer()
      }
    } catch (ex) {
      console.error(ex)
    }
  }


  getUserServer = () => {
    try {

      const {
        id,
        idToken
      } = this.ctx.req.session.passport.user

      if (id && idToken){
        this.user = {
          id,
          idToken
        }
      } else {
        this.authFailServer()
      }

    } catch (ex) {
      console.error('getUserServer error')
      console.error(ex)
    }
  }

  getUserBrowser = () => {
    try {
      let id = localStorage.getItem('userId')
      let idToken = localStorage.getItem('idToken')

      if (id && idToken){
        this.user = {
          id,
          idToken
        }
      } else {
        this.authFailBrowser()
      }

    } catch (ex) {
      this.authFailBrowser()
      console.error('getUserBrowser error')
      console.error(ex)
    }
  }

  authFail = () => {
    if(this.env === 'server'){
      this.authFailServer()
    } else {
      this.authFailBrowser()
    }
  }

  authFailServer = () => {
    console.log("authFailServer")
    this.ctx.res.redirect('/')
  }

  authFailBrowser = () => {
    console.log("authFailBrowser")
    router.replace('/')
  }

  pending = () => {
    if (this.env === 'server'){
      this.pendingServer()
    } else {
      this.pendingClient()
    }
  }

  pendingServer = () => {
    this.ctx.res.redirect(`/cms/${this.subdomain}/pending`)
  }

  pendingClient = () => {
    router.replace(`/cms/${this.subdomain}/pending`)
  }

  fetchPermissions = async () => {
    try {

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
              }
              permissions {
                organization {
                  id
                  subdomain
                }
                role
              }
            }
          }`
        })
      })

      let {
        data: {
          authenticate
        }
      } = await response.json()

      this.authProfile = authenticate

    } catch (ex) {
      console.error('fetchPermissions fail')
      console.error(ex)
      this.authFail()
    }
  }


}
