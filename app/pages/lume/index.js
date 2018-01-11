import React, {Component} from 'react'
import OrganizationHome from '../../components/lume/OrganizationHome'
import withData from '../../apollo'
import Template from '../../components/shared/Template'

class LumeOrganization extends Component {

  static getInitialProps = async (ctx) => {
    try {

      return {
        ...ctx.query
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
        <OrganizationHome
          {...this.props}
        />
      </Template>
    )
  }
}

export default withData(LumeOrganization)
