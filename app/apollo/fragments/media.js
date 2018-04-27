import gql from 'graphql-tag'

const fragment = gql`
  fragment MediaFragment on media {
    id
    localId
    title
    description
    host
    format
    organization {
      id
      subdomain
    }
  }
`

export default fragment
