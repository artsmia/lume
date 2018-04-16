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
        auth
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
        <CmsHome
          {...this.props}
        />
      </Template>
    )
  }
}

export default withData(CmsIndex)
