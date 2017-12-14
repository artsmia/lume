import React, {Component} from 'react'
import Editor from '../../cms/Editor'
import withData from '../../apollo'
import Cookie from 'js-cookie'
import Template from '../../shared/Template'

class Edit extends Component {

  static getInitialProps = async (ctx) => {
    try {
      const userId = (ctx.req) ? ctx.req.userId : Cookie.get("userId")
      const {subdomain, storyId} = ctx.query
      return {
        userId,
        subdomain,
        storyId
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
        <Editor
          {...this.props}
        />
      </Template>
    )
  }
}

export default withData(Edit)
