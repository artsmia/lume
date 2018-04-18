import React, {Component} from 'react'
import CmsHome from '../../components/cms/CmsHome'
import withData from '../../apollo'
import Template from '../../components/shared/Template'
import Auth from '../../auth'

class CmsIndex extends Component {

  static getInitialProps = async (ctx) => {
    try {


      let auth = new Auth(ctx)
      await auth.authenticate()

      return {
        user: auth.user
      }
    } catch (ex) {
      console.error(ex)
    }
  }


  render() {

    return (
      <Template
        {...this.props}
        user={this.props.user}
      >
        <CmsHome
          {...this.props}
        />
      </Template>
    )
  }
}

export default withData(CmsIndex)
