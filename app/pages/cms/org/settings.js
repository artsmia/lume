import React, {Component} from 'react'
import OrgSettings from '~/components/OrgSettings'
import Template from '~/components/Template'
import withData from '~/apollo/withData'
import Cookie from 'js-cookie'


class OrgSettingsPage extends Component {

  static getInitialProps = async (ctx) => {
    try {
      const userId = (ctx.req) ? ctx.req.userId : Cookie.get("userId")
      const {orgSub} = ctx.query
      return {
        userId,
        orgSub
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
