import React, {Component} from 'react'
import Thematic from '../../lume/Thematic'
import withData from '../../apollo'
import Template from '../../shared/Template'


class LumeThematicPage extends Component {

  static getInitialProps = async (ctx) => {
    try {
      const {subdomain, thematicId} = ctx.query
      return {
        subdomain,
        thematicId
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  render() {
    return (
      <Template
        drawer={false}
      >
        <Thematic
          {...this.props}
        />
      </Template>
    )
  }
}

export default withData(LumeThematicPage)