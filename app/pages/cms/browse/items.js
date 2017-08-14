import React, {Component} from 'react'
import BrowseItems from '../../../components/BrowseItems'
import withData from '../../../apollo/withData'

class Items extends Component {

  static getInitialProps = async (ctx) => {
    try {

    } catch (ex) {
      console.error(ex)
    }
  }

  render() {
    return (
      <BrowseItems
        {...this.props}
      />
    )
  }
}

export default withData(Items)
