import React, {Component} from 'react'
import OrgManager from '../../cms/OrgManager'
import Cookie from 'js-cookie'
import withData from '../../apollo'
import Template from '../../shared/Template'

class New extends Component {

  static getInitialProps = async (ctx) => {
    try {
      const userId = (ctx.req) ? ctx.req.userId : Cookie.get("userId")

      return {
        userId
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  render() {
    return (
      <Template
        {...this.props}
      >
        <OrgManager
          {...this.props}
        />
      </Template>
    )
  }
}

export default withData(New)
