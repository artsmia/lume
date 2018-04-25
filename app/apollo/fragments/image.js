import gql from 'graphql-tag'

const fragment = gql`
  fragment ImageFragment on image {
    id
    localId
    title
    description
    host
    organization {
      id
      subdomain
      customImageApiEnabled
      customImageEndpoint
    }
  }
`

export default fragment
