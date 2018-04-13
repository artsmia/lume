import React, {Component} from 'react'
import withData from '../apollo'
import Template from '../components/shared/Template'

class Error extends Component {

  static getInitialProps = async (context) => {
    try {

      return {
      }
    } catch (ex) {

    }
  }

  render() {
    return (
      <Template>
        <h2>Whoops that's an error</h2>
      </Template>

    )
  }

}

export default withData(Error)
