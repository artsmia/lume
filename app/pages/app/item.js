import React, {Component} from 'react'
import AppItem from '../../components/AppItem'
import withData from '../../apollo/withData'
import Template from '../../components/Template'


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
      <Template
        drawer={false}
      >
        <AppItem
          {...this.props}
        />
      </Template>
    )
  }
}

export default withData(AppIndex)
