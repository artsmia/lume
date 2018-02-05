import gql from 'graphql-tag'
import groupFragment from './group'

const fragment = gql`
  fragment CategoryFragment on category {
    id
    title
    description
    image {
      id
    }
    groups {
      ...GroupFragment
    }
  }
  ${groupFragment}
`

export default fragment
