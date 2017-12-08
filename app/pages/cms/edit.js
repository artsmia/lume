import React, {Component} from 'react'
import CmsEdit from '../../cms/Edit'
import withData from '../../apollo'
import Cookie from 'js-cookie'
import Template from '../../shared/Template'

class Edit extends Component {

  static getInitialProps = async (ctx) => {
    try {
      const userId = (ctx.req) ? ctx.req.userId : Cookie.get("userId")
      const {orgSub, storyId} = ctx.query
      return {
        userId,
        orgSub,
        storyId
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
        <CmsEdit
          {...this.props}
        />
      </Template>
    )
  }
}

export default withData(Edit)
