import React, { Component } from 'react'
import OrganizationHome from '../../components/lume/OrganizationHome'
import ExportOrganizationHome from '../../components/lume/OrganizationHome/OrganizationHome.component.js'

import Template from '../../components/shared/Template'
import Auth from '../../auth'
import { withRouter } from 'next/router'

class LumeOrganization extends Component {
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

const ExportOrganizationHomeWithRouter = withRouter(ExportOrganizationHome)

class ExportHome extends Component {
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
    console.log(process.env)
    return (
      <Template>
        <ExportOrganizationHomeWithRouter {...this.props.data} />
      </Template>
    )
  }
}

let ExportComponent =
  process.env.EXPORT_MODE === 'export' ? ExportHome : LumeOrganization

export default ExportComponent
