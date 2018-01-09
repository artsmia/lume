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
      obj {
        ...ObjFragment
      }
    }
  }

  ${objFragment}
`

export default fragment
