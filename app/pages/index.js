import React, {Component} from 'react'
import Home from '../lume/Home'
import withData from '../apollo'

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
      <Home
        {...this.props}
      />
    )
  }

}

export default withData(props => <Index {...props} />)
