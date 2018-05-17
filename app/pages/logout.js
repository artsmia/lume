import React, { Component } from 'react'
import Template from '../components/shared/Template'
import router from 'next/router'
import { Loading } from '../components/mia-ui/loading'
import withData from '../apollo'
import Head from '../components/shared/head'

export default class Logout extends Component {
  static getInitialProps = async ctx => {
    return {}
  }

  render() {
    return (
      <Template>
        <Head title={'Logging Out'} />
        <Loading />
      </Template>
    )
  }

  componentDidMount() {
    try {
      localStorage.removeItem('userId')
      localStorage.removeItem('idToken')

      router.replace('/')
    } catch (ex) {
      console.error('localStorage error')
    }
  }
}
