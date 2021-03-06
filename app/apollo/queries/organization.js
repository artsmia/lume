import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import organizationFragment from '../fragments/organization'

export const query = gql`
  query OrganizationQuery($subdomain: String) {
    organization(organization: { subdomain: $subdomain }) {
      ...OrganizationFragment
    }
  }
  ${organizationFragment}
`

export const options = {
  options: props => {
    const {
      router: { query }
    } = props

    let subdomain = props.subdomain ? props.subdomain : query.subdomain

    return {
      variables: {
        subdomain
      }
    }
  },
  props: ({ ownProps, data }) => {
    return {
      ...ownProps,
      ...data
    }
  }
}

export default graphql(query, options)
