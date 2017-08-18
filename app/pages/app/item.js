import React, {Component} from 'react'
import AppItem from '../../components/AppItem'
import withData from '../../apollo/withData'


class AppIndex extends Component {

  static getInitialProps = async (ctx) => {
    try {
      const {orgSub, itemId} = ctx.query
      return {
        orgSub,
        itemId
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  render() {
    return (
      <AppItem
        {...this.props}
      />
    )
  }
}

export default withData(AppIndex)
