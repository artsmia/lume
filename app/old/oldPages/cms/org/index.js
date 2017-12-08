import React, {Component} from 'react'
import OrgHome from '../../../cms/OrgHome'
import withData from '../../../apollo'
import Cookie from 'js-cookie'
import Template from '../../../shared/Template'

class OrgIndex extends Component {

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
        <OrgHome
          {...this.props}
        />
      </Template>
    )
  }
}

export default withData(OrgIndex)
