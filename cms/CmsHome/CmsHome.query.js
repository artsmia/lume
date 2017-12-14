import CmsHome from './CmsHome.component'
import {graphql } from 'react-apollo'
import gql from 'graphql-tag'

const query = gql`
  query OrgHomeQuery ($subdomain: String) {
    organization  (
      organization: {
        subdomain: $subdomain
      }
    ) {
      id
      name
    }
  }
`

const options = {
  options: (props) => {
    const {url: {query: {subdomain}}} = props
    return {
      variables: {
        subdomain
      }
    }
  },
  props: ({ ownProps, data }) => ({
    ...ownProps,
    ...data
  }),
}


export default graphql(query, options)
