import React, {Component} from 'react'
import BrowseItems from '../../../components/BrowseItems'
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
          subdomain
          items {
            title
            id
          }
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
      <BrowseItems
        {...this.props}
      />
    )
  }
}
