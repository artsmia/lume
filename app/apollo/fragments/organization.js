import gql from 'graphql-tag'

const fragment = gql`
  fragment OrganizationFragment on organization {
    id
    name
    subdomain
    emailDomain
    customImageApiEnabled
    customImageEndpoint
    customObjApiEndpoint
    customObjApiEnabled
  }
`

export default fragment
