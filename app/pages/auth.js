import React, {Component} from 'react'
import Template from '../components/shared/Template'
import getUser from '../auth/getUser'
import router from 'next/router'
import {Loading} from '../components/ui/spinner'
import Cookie from 'js-cookie'

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
        <Loading/>
      </Template>

    )
  }

  componentDidMount(){
    this.handleUser()
  }

  handleUser = async () => {
    try {
      await this.setCookies()

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

  setCookies = async () => {
    try {

        let {
          idToken,
          id
        } = this.props.user

        Cookie.set("userId", id)
        Cookie.set("idToken", idToken)


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
