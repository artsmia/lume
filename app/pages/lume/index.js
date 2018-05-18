import React, { Component } from 'react'
import OrganizationHome from '../../components/lume/OrganizationHome'
import Template from '../../components/shared/Template'
import Auth from '../../auth'

export default class LumeOrganization extends Component {
  static getInitialProps = async ctx => {
    try {
      let auth = new Auth(ctx)
      await auth.getUser()

      return {
        user: auth.user,
        ...ctx.query
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  // componentDidMount(){
  //   if (window.location.search === '?grandTour=true'){
  //     window.history.pushState({},'',window.location.href.split('?grandTour=true')[0] )
  //   }
  // }

  render() {
    return (
      <Template {...this.props}>
        <OrganizationHome {...this.props} />
      </Template>
    )
  }
}
