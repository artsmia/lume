import React, {Component} from 'react'
import withData from '../apollo'
import Template from '../components/shared/Template'

class SubTest extends Component {

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
        <h2>CHEESE CHEESE</h2>
      </Template>

    )
  }

}

export default withData(SubTest)
