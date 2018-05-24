import React, { Component } from 'react'
import CmsHome from '../../components/cms/CmsHome'
import Template from '../../components/shared/Template'
import Auth from '../../auth'

export default class CmsIndex extends Component {
  static getInitialProps = async ctx => {
    try {
      let auth = new Auth(ctx)
      await auth.authenticate()

      return {
        user: auth.user,
        tutorial: ctx.query.tutorial
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  render() {
    console.log(this.props)
    return (
      <Template {...this.props}>
        <CmsHome {...this.props} />
      </Template>
    )
  }
}
