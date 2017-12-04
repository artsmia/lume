import React, {Component} from 'react'
import EditObj from '../../../components/EditObj'
import withData from '../../../apollo'
import Cookie from 'js-cookie'
import Template from '../../../components/Template'

class Obj extends Component {

  static getInitialProps = async (ctx) => {
    try {
      const userId = (ctx.req) ? ctx.req.userId : Cookie.get("userId")
      const {orgSub, objId} = ctx.query
      return {
        userId,
        orgSub,
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
