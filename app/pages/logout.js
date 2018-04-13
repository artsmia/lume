import React, {Component} from 'react'
import Template from '../components/shared/Template'
import router from 'next/router'
import {Loading} from '../components/mia-ui/loading'
import withData from '../apollo'

class Logout extends Component {

  render() {
    return (
      <Template>
        <h3>congrats you logged out</h3>
      </Template>

    )
  }

  componentDidMount(){
    try {
      localStorage.removeItem('userId')
      localStorage.removeItem('idToken')
    } catch (ex) {
      console.error("localStorage error")
    }

  }

}


export default withData(Logout)
