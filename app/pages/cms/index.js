import React, {Component} from 'react'
import CmsHome from '../../components/cms/CmsHome'
import withData from '../../apollo'
import Template from '../../components/shared/Template'
import getUser from '../../auth/getUser'

class CmsIndex extends Component {

  static getInitialProps = async (ctx) => {
    try {

      let user = await getUser(ctx)

      return {
        user
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
