import React, { Component } from 'react'
import OrganizationHome from '../../components/lume/OrganizationHome'
import Template from '../../components/shared/Template'

export default class LumeOrganization extends Component {
  static getInitialProps = async ctx => {
    try {
      return {
        ...ctx.query
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  render() {
    return (
      <Template {...this.props}>
        <OrganizationHome {...this.props} />
      </Template>
    )
  }
}
