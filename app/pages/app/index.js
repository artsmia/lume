import React, {Component} from 'react'
import AppHome from '../../components/AppHome'
import withData from '../../apollo/withData'


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
      <AppHome
        {...this.props}
      />
    )
  }
}

export default withData(AppIndex)
