import React, {Component} from 'react'
import OrgSettings from '../../../cms/OrgSettings'
import Template from '../../../shared/Template'
import withData from '../../../apollo'
import Cookie from 'js-cookie'


class OrgSettingsPage extends Component {

  static getInitialProps = async (ctx) => {
    try {
      const userId = (ctx.req) ? ctx.req.userId : Cookie.get("userId")
      const {subdomain} = ctx.query
      return {
        userId,
        subdomain
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  render() {
    return (
      <Template
        drawer
        {...this.props}
      >
        <OrgSettings
          {...this.props}
        />
      </Template>
    )
  }
}

export default withData(OrgSettingsPage)
