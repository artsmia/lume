import React, {Component} from 'react'
import withData from '../../apollo'
import Template from '../../components/shared/Template'
import Auth from '../../auth'
import Head from '../../components/shared/head'

class PendingApproval extends Component {

  static getInitialProps = async (ctx) => {
    try {

      const auth = new Auth(ctx)

      await auth.getUser()

      return {
        user: auth.user,
      }
    } catch (ex) {

    }
  }

  render() {
    return (
      <Template
        user={this.props.user}
      >
        <Head
          title={'Access Pending'}
        />
        <h2>Your access to this organization is still pending approval</h2>
      </Template>

    )
  }

}

export default withData(PendingApproval)
