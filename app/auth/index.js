import router from 'next/router'
import fetch from 'isomorphic-unfetch'

export default class Auth {

  cmsRoles = ['admin', 'editor', 'contributor']

  constructor(ctx){

    this.pathname = ctx.pathname

    if (process.browser){
      this.env = 'browser'
      this.subdomain = ctx.query.subdomain
    } else if (
      ctx.req
    ) {
      this.env = 'server'
      this.subdomain = ctx.req.params.subdomain
      this.session = ctx.req.session
      this.res = ctx.res
    } else {
      console.log("not server or browser?")
      this.authFail()
    }

  }

  authenticate = async() => {
    try {

      await this.getUser()



      this.organization = this.user.organizations.find(
        organization => organization.subdomain === this.subdomain
      )



      switch (true) {


        case (process.env.AUTH_STRATEGY === 'local'): {
          console.log("local auth strategy")
          break
        }
        case(this.pathname === '/cms/orgSettings' && this.organization.role !== 'admin'): {
          console.log('settings is only for admins')
          this.authFail()
          break
        }
        case (!this.organization): {

          console.log("couldn't find permissions for this subdomain")
          this.authFail()
          break
        }
        case (this.organization.role === 'pending'): {
          console.log("role is pending")
          this.pending()
          break
        }
        case (this.cmsRoles.includes(this.organization.role)): {
          console.log("allowed")
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



  getUser = async () => {
    try {

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

      await this.fetchPermissions()


    } catch (ex) {
      console.error(ex)
    }
  }

  getUserLocal = () => {
    try {
      this.user = {
        id: 'localuser',
        idToken: 'localuser'
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
      } = this.session.passport.user

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
    this.res.redirect('/')
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
    this.res.redirect(`/cms/${this.subdomain}/pending`)
  }

  pendingClient = () => {
    router.replace(`/cms/${this.subdomain}/pending`)
  }

  fetchPermissions = async () => {
    try {

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

      this.user = user

    } catch (ex) {
      console.error('fetchPermissions fail')
      console.error(ex)
      this.authFail()
    }
  }


}
