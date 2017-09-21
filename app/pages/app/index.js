import React, {Component} from 'react'
import AppHome from '../../components/AppHome'
import withData from '../../apollo/withData'
import Template from '../../components/Template'

class AppIndex extends Component {

  static getInitialProps = async (ctx) => {
    try {
      const {orgSub} = ctx.query
      return {
        orgSub
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  render() {
    return (
      <Template
        drawer={false}
        {...this.props}
      >
        <AppHome
          {...this.props}
        />
      </Template>
    )
  }
}

export default withData(AppIndex)
