import React, {Component} from 'react'
import EditObj from '../../../cms/EditObj'
import withData from '../../../apollo'
import Cookie from 'js-cookie'
import Template from '../../../shared/Template'

class Obj extends Component {

  static getInitialProps = async (ctx) => {
    try {
      const userId = (ctx.req) ? ctx.req.userId : Cookie.get("userId")
      const {subdomain, objId} = ctx.query
      return {
        userId,
        subdomain,
        objId
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
        <EditObj
          {...this.props}
        />
      </Template>
    )
  }
}

export default withData(Obj)
