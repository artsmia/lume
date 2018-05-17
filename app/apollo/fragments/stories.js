import gql from 'graphql-tag'
import imageFragment from './image'

const fragment = gql`
  fragment StoriesFragment on story {
    id
    title
    slug
    description
    previewImage {
      ...ImageFragment
    }
    updatedAt
    template
  }
  ${imageFragment}
`

export default fragment
