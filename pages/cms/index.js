import React, {Component} from 'react'
import CmsHome from '../../components/cms/CmsHome'
import withData from '../../apollo'
import Template from '../../components/shared/Template'

class OrgIndex extends Component {

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
        <CmsHome
          {...this.props}
        />
      </Template>
    )
  }
}

export default withData(OrgIndex)
