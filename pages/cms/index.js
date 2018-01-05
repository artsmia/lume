import React, {Component} from 'react'
import CmsHome from '../../components/cms/CmsHome'
import withData from '../../apollo'
import Cookie from 'js-cookie'
import Template from '../../components/shared/Template'
import getUser from '../../auth/getUser'

class CmsIndex extends Component {

  static getInitialProps = async (ctx) => {
    try {

      let user = await getUser(ctx)

      return {
        subdomain: ctx.query.subdomain,
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
