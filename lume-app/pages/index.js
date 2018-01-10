import React, {Component} from 'react'
import Home from '../components/lume/Home'
import withData from '../apollo'
import Template from '../components/shared/Template'
import {apiUrl} from '../config'

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
      <Template>
        <Home
          {...this.props}
        />
      </Template>

    )
  }

}

export default withData(Index)
