import React, {Component} from 'react'
import Template from '../components/shared/Template'
import getUser from '../auth/getUser'
import router from 'next/router'

export default class Auth extends Component {

  static getInitialProps = async (ctx) => {
    try {

      let user = await getUser(ctx)
      return {
        user
      }
    } catch (ex) {
      console.log("error?", ex)
    }
  }

  render() {
    return (
      <Template>
        <h1>hello</h1>
      </Template>

    )
  }

  componentDidMount(){
    this.handleUser()
  }

  handleUser = async () => {
    try {
      await this.setupLocalStorage()

      let organizations = await this.getUserOrganizations()

      if (organizations.length > 0) {

        let subdomain = organizations[0].subdomain
        router.push({
          pathname: '/cms',
          query: {
            subdomain
          }
        }, `/${subdomain}/cms`)
      } else {
        router.push({
          pathname: '/cms/orgManager',
        }, `/new`)
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  setupLocalStorage = async () => {
    try {

      const {
        id,
        idToken
      } = this.props.user


      localStorage.setItem('idToken', idToken)
      localStorage.setItem('userId', id)


    } catch (ex) {
      console.error(ex)
    }
  }


  getUserOrganizations= async() => {
    try {
      const response = await fetch(process.env.API_URL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          query: `{
            user (id:"${this.props.user.id}") {
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


}
