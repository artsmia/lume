import React, {Component} from 'react'
import CmsHome from '../../components/cms/CmsHome'
import withData from '../../apollo'
import Template from '../../components/shared/Template'

class CmsIndex extends Component {

  static getInitialProps = async (ctx) => {
    try {

      let user
      if (ctx.query.subdomain === 'local'){
        user = {
          id: 'local'
        }
      }

      return {
        user,
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
        <CmsHome
          {...this.props}
        />
      </Template>
    )
  }
}

export default withData(CmsIndex)
