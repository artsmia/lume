import React, {Component} from 'react'
import {hashToCookies} from '../auth/client'

export default class extends Component {

  static getInitialProps = async (context) => {
    try {
      return {

      }
    } catch (ex) {

    }
  }

  render() {
    return (
      <div>
        <h2>Hello</h2>
      </div>
    )
  }

  componentDidMount(){
    hashToCookies()
  }

}
