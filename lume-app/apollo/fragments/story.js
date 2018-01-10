import gql from 'graphql-tag'
import objFragment from './obj'

const fragment = gql`
  fragment StoryFragment on story {
    id
    title
    description
    template
    visibility
    previewImage{
      id
    }
    contents {
      id
      type
      index
      title
      description
      image0 {
        id
      }
      image1 {
        id
      }
      geometry {
        type
        coordinates
      }
      obj {
        ...ObjFragment
      }
      videoUrl
    }
  }

  ${objFragment}
`

export default fragment
