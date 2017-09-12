import React, {Component} from 'react'
import {hashToCookies} from '../auth'
import apiFetch from '../utils/apiFetch'
import Cookies from 'js-cookie'
import Router from 'next/router'
import {Loading} from '../ui/spinner'
import Template from '../components/Template/Template'


export default class extends Component {

  static getInitialProps = async (context) => {
    try {
      return {

      }
    } catch (ex) {

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
    this.forwardToOrganization()
  }

  forwardToOrganization = async () => {
    try {
      await hashToCookies()
      const IDToken = Cookies.get('IDToken')
      const {user} = await apiFetch(`{
        user {
          id
          email
          organizations {
            subdomain
          }
        }
      }`, IDToken)

      Cookies.set("userId", user.id)

      if (
        user.organizations[0]
      ) {
        const {subdomain} = user.organizations[0]
        Router.push({
          pathname: '/cms/org',
          query: {
            orgSub: subdomain
          }
        }, `/${subdomain}/cms`)
      } else {
        Router.push({
          pathname: '/cms/org/joinOrCreate',
        }, `/new`)
      }
    } catch (ex) {
      console.log(ex)
    }
  }

}
