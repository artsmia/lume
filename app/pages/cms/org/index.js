import React, {Component} from 'react'


export default class extends Component {

  static getInitialProps = async (context) => {
    try {
      console.log(context)

      return {
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  render() {
    return (
      <div>
        <h2>org subdomain</h2>
      </div>
    )
  }
}
