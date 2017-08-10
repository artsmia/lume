import React, {Component} from 'react'
import OrgHome from '../../../components/OrgHome'
import apiFetch from '../../../utils/apiFetch'

export default class extends Component {

  static getInitialProps = async (context) => {
    try {
      const {orgSub} = context.query
      const {organization} = await apiFetch(`{
        organization (
          subdomain: "${orgSub}"
        ) {
          id
          name
        }
      }`)

      return {
        organization
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  render() {
    return (
      <OrgHome
        {...this.props}
      />
    )
  }
}
