import React, {Component} from 'react'
import OrgSettings from '../../components/cms/OrgSettings'
import withData from '../../apollo'
import Template from '../../components/shared/Template'
import Auth from '../../auth'

class Settings extends Component {

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
      >
        <OrgSettings
          {...this.props}
        />
      </Template>
    )
  }
}

export default withData(Settings)
