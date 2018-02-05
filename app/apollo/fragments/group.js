import gql from 'graphql-tag'

const fragment = gql`
  fragment GroupFragment on group {
    id
    title
    description
  }
`

export default fragment
