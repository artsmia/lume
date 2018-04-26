import React, {Component} from 'react'
import Editor from '../../components/cms/Editor'
import withData from '../../apollo'
import Template from '../../components/shared/Template'
import Auth from '../../auth'

class Edit extends Component {

  static getInitialProps = async (ctx) => {
    try {

      let {
        storySlug,
        subdomain
      } = ctx.query


      let auth = new Auth(ctx)
      await auth.authenticate()


      return {
        storySlug,
        subdomain,
        user: auth.user
      }
    } catch (ex) {
      console.error(ex)
    }
  }


  render() {

    console.log(this.props)
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
