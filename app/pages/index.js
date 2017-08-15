import React, {Component} from 'react'
import Root from '../components/Root'
import withData from '../apollo/withData'

class Index extends Component {

  static getInitialProps = async (context) => {
    try {
      return {

      }
    } catch (ex) {

    }
  }

  render() {
    return (
      <Root
        {...this.props}
      />
    )
  }

}

export default withData(Index)
