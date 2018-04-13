import React, {Component} from 'react'
import withData from '../../apollo'
import Template from '../../components/shared/Template'

class PendingApproval extends Component {

  static getInitialProps = async ({query}) => {
    try {

      return {
        ...query
      }
    } catch (ex) {

    }
  }

  render() {
    return (
      <Template>
        <h2>Your access to this organization is still pending approval</h2>
      </Template>

    )
  }

}

export default withData(PendingApproval)
