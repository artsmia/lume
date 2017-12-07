import React, {Component} from 'react'
import Home from '../../../cms/Home'
import withData from '../../../apollo'
import Cookie from 'js-cookie'
import Template from '../../../shared/Template'

class OrgIndex extends Component {

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
        <Home
          {...this.props}
        />
      </Template>
    )
  }
}

export default withData(OrgIndex)
