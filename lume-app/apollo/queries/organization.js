import {graphql } from 'react-apollo'
import gql from 'graphql-tag'
import organizationFragment from '../fragments/organization'

const query = gql`
  query OrganizationQuery ($subdomain: String) {
    organization  (
      organization: {
        subdomain: $subdomain
      }
    ) {
      ...OrganizationFragment
    }
  }
  ${organizationFragment}
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
