import gql from 'graphql-tag'
import imageFragment from './image'

const fragment = gql`
  fragment GroupFragment on group {
    id
    title
    slug
    description
    image {
      ...ImageFragment
    }
  }
  ${imageFragment}
`

export default fragment
