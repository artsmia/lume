import gql from 'graphql-tag'
import groupFragment from './group'
import imageFragment from './image'

const fragment = gql`
  fragment CategoryFragment on category {
    id
    title
    description
    image {
      ...ImageFragment
    }
    groups {
      ...GroupFragment
    }
  }
  ${groupFragment}
  ${imageFragment}
`

export default fragment
