import React, {Component} from 'react'
import EditItem from '../../../components/EditItem'
import apiFetch from '../../../utils/apiFetch'

export default class extends Component {

  static getInitialProps = async (context) => {
    try {
      const {orgSub, itemId} = context.query
      const {organization, item} = await apiFetch(`{
        organization (
          subdomain: "${orgSub}"
        ) {
          id
          name
          subdomain
        }
        item (
          id: "${itemId}"
        ) {
          id
          title
          artist
        }
      }`)

      return {
        organization,
        item
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  render() {
    return (
      <EditItem
        {...this.props}
      />
    )
  }
}
