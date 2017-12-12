import gql from 'graphql-tag'

const fragment = gql`
  fragment PictureEditorFragment on Picture {
    id
    title
    description
    image {
      id
    }
  }
`

export default fragment
