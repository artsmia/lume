import React, { Component } from 'react'
import Home from '../../components/lume/Home'
import Template from '../../components/shared/Template'
import Auth from '../../auth'

export default class CmsSplash extends Component {
  static getInitialProps = async context => {
    try {
      let auth = new Auth(context)

      await auth.getUser()
      return {
        user: auth.user
      }
    } catch (ex) {}
  }

  render() {
    return (
      <Template user={this.props.user}>
        <Home {...this.props} />
      </Template>
    )
  }
}
