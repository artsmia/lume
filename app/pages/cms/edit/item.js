import React, {Component} from 'react'
import EditItem from '../../../components/EditItem'
import withData from '../../../apollo/withData'

class Item extends Component {

  static getInitialProps = async (context) => {
    try {

    } catch (ex) {
      console.error(ex)
    }
  }

  render() {
    return (
      <EditItem
        {...this.props}
      />
    )
  }
}
