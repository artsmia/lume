import gql from 'graphql-tag'

const fragment = gql`
  fragment MovieEditorFragment on Movie {
    id
    title
    description
    video {
      id
      url
    }
  }
`

export default fragment
