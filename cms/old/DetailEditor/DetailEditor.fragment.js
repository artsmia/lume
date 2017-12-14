import gql from 'graphql-tag'

const fragment = gql`
  fragment DetailEditorFragment on Detail {
    id
    index
    title
    image {
      id
    }
    crops {
      id
      title
      index
      description
      geometry {
        type
        coordinates
      }
    }
  }
`

export default fragment
