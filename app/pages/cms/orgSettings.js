import React, {Component} from 'react'
import OrgSettings from '../../components/cms/OrgSettings'
import withData from '../../apollo'
import Template from '../../components/shared/Template'
import getUser from '../../auth/getUser'

class Settings extends Component {

  static getInitialProps = async (ctx) => {
    try {

      let user = await getUser(ctx)
      return {
        user,
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
