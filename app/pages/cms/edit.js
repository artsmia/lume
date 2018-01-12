import React, {Component} from 'react'
import Editor from '../../components/cms/Editor'
import withData from '../../apollo'
import Template from '../../components/shared/Template'
import getUser from '../../auth/getUser'

class Edit extends Component {

  static getInitialProps = async (ctx) => {
    try {

      let {
        storyId,
        subdomain
      } = ctx.query

      return {
        storyId,
        subdomain,
        user: getUser(ctx)
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
