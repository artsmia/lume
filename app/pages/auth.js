import React, { Component } from 'react'
import Template from '../components/shared/Template'
import AuthClass from '../auth'
import router from 'next/router'
import { Loading } from '../components/mia-ui/loading'
import withData from '../apollo'
import Head from '../components/shared/head'

export default class Auth extends Component {
  static getInitialProps = async ctx => {
    try {
      let auth = new AuthClass(ctx)

      await auth.getUser()

      console.log(auth.user)
      return {
        user: auth.user
      }
    } catch (ex) {
      console.log('error?', ex)
    }
  }

  render() {
    return (
      <Template>
        <Head title={'...authenticating'} />
        <Loading />
      </Template>
    )
  }

  componentDidMount() {
    this.handleUser()
  }

  handleUser = async () => {
    try {
      await this.setLocal()

      let organizations = await this.getUserOrganizations()
      if (organizations.length === 0) {
        return router.push(
          {
            pathname: '/cms/organizations',
            query: {
              tutorial: true
            }
          },
          `/organizations`
        )
      } else {
        let adminOrg = organizations.find(org => org.role === 'admin')

        if (adminOrg) {
          return router.push(
            {
              pathname: '/cms',
              query: {
                subdomain: adminOrg.subdomain
              }
            },
            `/${adminOrg.subdomain}`
          )
        }

        let nonPending = organizations.find(org => org.role !== 'pending')

        if (nonPending) {
          return router.push(
            {
              pathname: '/cms',
              query: {
                subdomain: nonPending.subdomain
              }
            },
            `/${nonPending.subdomain}`
          )
        } else {
          return router.push(
            {
              pathname: '/cms',
              query: {
                subdomain: organizations[0].subdomain
              }
            },
            `/${organizations[0].subdomain}`
          )
        }
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  setLocal = async () => {
    try {
      let { idToken, id } = this.props.user

      localStorage.removeItem('userId')
      localStorage.removeItem('idToken')

      localStorage.setItem('userId', id)
      localStorage.setItem('idToken', idToken)
    } catch (ex) {
      console.error(ex)
    }
  }

  getUserOrganizations = async () => {
    try {
      const response = await fetch(process.env.API_URL, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
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
