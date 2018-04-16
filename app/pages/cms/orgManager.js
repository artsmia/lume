import React, {Component} from 'react'
import OrgManager from '../../components/cms/OrgManager'
import withData from '../../apollo'
import Template from '../../components/shared/Template'
import Auth from '../../auth'

class New extends Component {

  static getInitialProps = async (ctx) => {
    try {


      let auth = new Auth(ctx)
      await auth.authenticate()


      return {
        auth,
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
      >
        <OrgManager
          {...this.props}
        />
      </Template>
    )
  }
}

export default withData(New)
