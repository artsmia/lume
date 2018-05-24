import React, { Component } from 'react'
import { withRouter } from 'next/router'
import Template from '../../components/shared/Template'
import Auth from '../../auth'
import Head from '../../components/shared/head'

class PendingApproval extends Component {
  static getInitialProps = async ctx => {
    try {
      const auth = new Auth(ctx)

      await auth.getUser()

      return {
        user: auth.user
      }
    } catch (ex) {}
  }

  componentDidMount() {
    this.redirectIfMembershipApproved()
  }

  render() {
    return (
      <Template user={this.props.user}>
        <Head title={'Access Pending'} />
        <h2>Your access to this organization is still pending approval</h2>
      </Template>
    )
  }

  /**
   * If a user has already been approved don't let them sit at the pending page
   * thinking that they're still pending.
   *
   * TODO this should happen universally in `getInitialProps`?
   */
  redirectIfMembershipApproved = () => {
    const { router, user: { organizations } } = this.props
    const currentOrgMembership = organizations.find(
      org => org.subdomain === router.query.subdomain
    )

    if (currentOrgMembership && currentOrgMembership.role !== 'pending') {
      router.replace(
        {
          pathname: '/cms',
          query: { subdomain: currentOrgMembership.subdomain }
        },
        `/${currentOrgMembership.subdomain}`
      )
    }
  }
}

export default withRouter(PendingApproval)
