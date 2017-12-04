import React, {Component} from 'react'
import AppThematic from '../../components/AppThematic'
import withData from '../../apollo'
import Template from '~/components/Template'


class AppThematicPage extends Component {

  static getInitialProps = async (ctx) => {
    try {
      const {orgSub, thematicId} = ctx.query
      return {
        orgSub,
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
        <AppThematic
          {...this.props}
        />
      </Template>
    )
  }
}

export default withData(AppThematicPage)
